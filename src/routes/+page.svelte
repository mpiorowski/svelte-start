<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import Input from '$lib/ui/input.svelte';
	import Checkbox from '$lib/ui/checkbox.svelte';
	import Radio from '$lib/ui/radio.svelte';
	import SelectCustom from '$lib/ui/select-custom.svelte';
	import Switch from '$lib/ui/switch.svelte';
	import Dropzone from '$lib/ui/dropzone.svelte';
	import FileInput from '$lib/ui/file-input.svelte';
	import Modal from '$lib/ui/modal.svelte';
	import SelectMultiple from '$lib/ui/select-multiple.svelte';
	import Tooltip from '$lib/ui/tooltip.svelte';
	import Select from '$lib/ui/select.svelte';
	import { enhance } from '$app/forms';
	import { showToast, toast } from '$lib/ui/toast';
	import { generateId } from '$lib/helpers';
	import Drawer from '$lib/ui/drawer.svelte';
	import { extractError } from '$lib/errors';

	export let data: import('./$types').PageData;
	export let form: import('./$types').ActionData;

	$: if (form?.error) toast.error('Error', 'An error occurred while saving the form.');
	$: if (form?.fields) showError(form.fields);
	function showError(fields: { field: string; tag: string }[]): void {
		const firstError = fields[0]?.field.toLowerCase();
		showToast({
			id: generateId(),
			title: 'Validation failed',
			description: `Found ${Object.keys(fields).length} errors`,
			type: 'error',
			duration: 6000,
			action: {
				label: 'Go to first error',
				onClick: () => {
					const input: HTMLInputElement | null = document.querySelector(`[name="${firstError}"]`);
					input?.focus();
				},
			},
		});
	}

	const countries = ['Poland', 'United States', 'Canada', 'Mexico'] as const;
	const positions = ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'] as const;
	const skills = [
		'Frontend Development',
		'Backend Development',
		'UI/UX Design',
		'DevOps',
		'Database Administration',
		'Mobile Development',
	] as const;

	let openDrawer = false;
	let openModal = false;

	let active = data.profile.active ? 'on' : 'off';
	let email_notifications = data.profile.email_notifications.split(',');
	$: resume_file = new File([data.profile.resume], 'resume');
	$: cover_file = [new File([data.profile.cover], 'cover')];
</script>

<Drawer name="drawer" bind:open={openDrawer}>
	<div class="p-6">
		<h2 class="text-lg font-semibold leading-7">Drawer</h2>
		<p class="mt-1 text-sm leading-6 text-gray-400">Drawer content goes here.</p>
	</div>
</Drawer>
<Modal name="deactive" alert bind:open={openModal}>
	<form method="post" action="?/deactive">
		<Button>Deactivate</Button>
	</form>
</Modal>

<section class="h-full overflow-auto p-10">
	<form
		action="?/validate"
		method="post"
		enctype="multipart/form-data"
		class="max-w-2xl"
		bind:this={form}
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					toast.success('Saved', 'User profile has been updated.');
				}
				await update({ reset: false });
			};
		}}
	>
		<input type="hidden" name="id" value={data.profile.id} />
		<div class="space-y-12">
			<div class="border-b border-gray-600 pb-12">
				<div>
					<h2 class="flex items-center gap-2 text-base font-semibold leading-7">
						Profile
						<Tooltip
							auto
							name="profile"
							content="This information will be displayed publicly so be careful what you share."
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-info h-4"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="12" y1="16" x2="12" y2="12" />
								<line x1="12" y1="8" x2="12.01" y2="8" />
							</svg>
						</Tooltip>
					</h2>
					<p class="mt-1 text-sm leading-6 text-gray-400">
						This information will be displayed publicly so be careful what you share.
					</p>
				</div>

				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
					<div class="sm:col-span-4">
						<Switch name="active" label="Active" bind:value={active} />
					</div>
					<div class="sm:col-span-4">
						<Input
							name="username"
							label="Username"
							autocomplete="username"
							bind:value={data.profile.username}
							error={extractError(form?.fields, 'username')}
						/>
					</div>

					<div class="col-span-full">
						<Input
							name="about"
							label="About"
							bind:value={data.profile.about}
							rows={3}
							helper="Write a few sentences about yourself."
						/>
					</div>

					<div class="col-span-full">
						<FileInput
							label="Resume"
							name="resume"
							bind:file={resume_file}
							helper="PDF up to 5MB"
						/>
					</div>

					<div class="col-span-full">
						<Dropzone
							name="cover"
							label="Cover photo"
							bind:files={cover_file}
							description="SVG, PNG, JPG, GIF up to 10MB"
							accept="image/*"
						/>
					</div>
				</div>
			</div>

			<div class="border-b border-gray-600 pb-6">
				<h2 class="flex items-center gap-2 text-base font-semibold leading-7">
					Personal Information

					<Tooltip
						auto
						name="personal"
						content="Use a permanent address where you can receive mail."
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-info h-4"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="16" x2="12" y2="12" />
							<line x1="12" y1="8" x2="12.01" y2="8" />
						</svg>
					</Tooltip>
				</h2>
				<p class="mt-1 text-sm leading-6 text-gray-400">
					Use a permanent address where you can receive mail.
				</p>

				<div class="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
					<div class="sm:col-span-3">
						<Input
							name="first_name"
							label="First name"
							autocomplete="given-name"
							bind:value={data.profile.first_name}
						/>
					</div>

					<div class="sm:col-span-3">
						<Input
							name="last_name"
							label="Last name"
							autocomplete="family-name"
							bind:value={data.profile.last_name}
						/>
					</div>

					<div class="sm:col-span-4">
						<Input
							name="email"
							label="Email address"
							autocomplete="email"
							bind:value={data.profile.email}
						/>
					</div>

					<div class="sm:col-span-3">
						<Select name="country" label="Country" bind:value={data.profile.country}>
							{#each countries as country}
								<option value={country}>
									{country}
								</option>
							{/each}
						</Select>
					</div>

					<div class="col-span-full">
						<Input
							name="street_address"
							label="Street address"
							bind:value={data.profile.street_address}
							autocomplete="street-address"
						/>
					</div>

					<div class="sm:col-span-2 sm:col-start-1">
						<Input
							name="city"
							label="City"
							bind:value={data.profile.city}
							autocomplete="address-level2"
						/>
					</div>

					<div class="sm:col-span-2">
						<Input
							name="state"
							label="State / Province"
							bind:value={data.profile.state}
							autocomplete="address-level1"
						/>
					</div>

					<div class="sm:col-span-2">
						<Input
							name="zip"
							label="ZIP / Postal"
							bind:value={data.profile.zip}
							autocomplete="postal-code"
						/>
					</div>
				</div>
			</div>

			<div class="border-b border-gray-600 pb-12">
				<h2 class="flex items-center gap-2 text-base font-semibold leading-7">
					Notifications
					<Tooltip
						auto
						name="notifications"
						content="We'll always let you know about important changes, but you pick what else you want to hear about."
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-info h-4"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="16" x2="12" y2="12" />
							<line x1="12" y1="8" x2="12.01" y2="8" />
						</svg>
					</Tooltip>
				</h2>
				<p class="mt-1 text-sm leading-6 text-gray-400">
					We'll always let you know about important changes, but you pick what else you want to hear
					about.
				</p>

				<div class="mt-10 space-y-10">
					<fieldset>
						<legend class="text-sm font-semibold leading-6"> By Email </legend>
						<div class="mt-6 space-y-6">
							<Checkbox
								id="comments"
								name="email_notifications"
								value="comments"
								label="Comments"
								bind:group={email_notifications}
								description="Get notified when someones posts a comment on a posting."
							/>
							<Checkbox
								id="candidates"
								name="email_notifications"
								value="candidates"
								label="Candidates"
								bind:group={email_notifications}
								description="Get notified when a candidate applies for a job."
							/>
							<Checkbox
								id="offers"
								name="email_notifications"
								value="offers"
								label="Offers"
								bind:group={email_notifications}
								description="Get notified when a candidate accepts or rejects an offer."
							/>
						</div>
					</fieldset>
					<fieldset>
						<legend class="text-sm font-semibold leading-6"> Push Notifications </legend>
						<p class="mt-1 text-sm leading-6 text-gray-400">
							These are delivered via SMS to your mobile phone.
						</p>
						<div class="mt-6 space-y-6">
							<Radio
								id="everything"
								name="push_notification"
								label="Everything"
								value="everything"
								bind:group={data.profile.push_notification}
							/>
							<Radio
								id="mentions"
								name="push_notification"
								label="Same as email"
								value="mentions"
								bind:group={data.profile.push_notification}
							/>
							<Radio
								id="nothing"
								name="push_notification"
								label="No push notifications"
								value="nothing"
								bind:group={data.profile.push_notification}
							/>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="pb-12">
				<h2 class="flex items-center gap-2 text-base font-semibold leading-7">
					Profesional Information
					<Tooltip
						auto
						name="profesional"
						content="Share your profesional details so others can find you."
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-info h-4"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="16" x2="12" y2="12" />
							<line x1="12" y1="8" x2="12.01" y2="8" />
						</svg>
					</Tooltip>
				</h2>
				<p class="mt-1 text-sm leading-6 text-gray-400">
					Share your profesional details so others can find you.
				</p>
				<div class="mt-6">
					<SelectCustom
						name="position"
						label="Position"
						bind:value={data.profile.position}
						values={positions}
						options={positions}
					/>
				</div>
				<SelectMultiple
					name="skills"
					label="Skills"
					bind:value={data.profile.skills}
					options={skills}
				/>
			</div>
		</div>

		<div class="inline-flex items-center gap-x-4">
			<Button type="button" on:click={() => (openModal = true)}>Modal</Button>
			<Button type="button" on:click={() => (openDrawer = true)}>Drawer</Button>
			<Button type="button" on:click={() => toast.success('Success', "We've sent you an email.")}>
				Toast
			</Button>
			<Button>Save</Button>
		</div>
	</form>
</section>
