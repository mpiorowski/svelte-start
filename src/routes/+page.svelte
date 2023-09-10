<script>
    import Button from "$lib/Button.svelte";
    import Input from "$lib/Input.svelte";
    import Checkbox from "$lib/Checkbox.svelte";
    import Radio from "$lib/Radio.svelte";
    import Select from "$lib/Select.svelte";
    import { z } from "zod";
    import Switch from "$lib/Switch.svelte";
    import Dropzone from "$lib/Dropzone.svelte";

    const countries = /** @type {const} */ ([
        "United States",
        "Canada",
        "Mexico",
    ]);
    const pushNotifications = /** @type {const} */ ([
        "everything",
        "same",
        "none",
    ]);
    const shema = z.object({
        username: z.string().min(3).max(20),
        about: z.string().max(1000),
        photo: z.instanceof(File),
        coverPhoto: z.instanceof(File),
        firstName: z.string().max(50),
        lastName: z.string().max(50),
        email: z.string().email(),
        country: z.enum(countries),
        streetAddress: z.string().max(100),
        city: z.string().max(50),
        region: z.string().max(50),
        postalCode: z.string().max(20),
        comments: z.boolean(),
        candidates: z.boolean(),
        offers: z.boolean(),
        pushNotifications: z.enum(pushNotifications),
        availableNow: z.boolean(),
        b2b: z.boolean(),
    });

    /**
     * @typedef {z.infer<typeof shema>} User
     * @type {User}
     */
    let user = {
        username: "janesmith",
        about: "I love vacations and traveling.",
        photo: new File([""], "photo.png"),
        coverPhoto: new File([""], "cover-photo.png"),
        firstName: "Jane",
        lastName: "Smith",
        email: "janessmith@gmail.com",
        country: countries[0],
        streetAddress: "123 Main St.",
        city: "San Francisco",
        region: "CA",
        postalCode: "94111",
        comments: false,
        candidates: true,
        offers: true,
        pushNotifications: pushNotifications[1],
        availableNow: true,
        b2b: false,
    };

    /**
     * @param {SubmitEvent & {currentTarget: HTMLFormElement}} event
     * @returns {void}
     */
    function handleSubmit(event) {
        const form = new FormData(event.currentTarget);
        const valid = shema.safeParse({
            username: form.get("username"),
            about: form.get("about"),
            photo: form.get("photo"),
            coverPhoto: form.get("cover-photo"),
            firstName: form.get("first-name"),
            lastName: form.get("last-name"),
            email: form.get("email"),
            country: form.get("country"),
            streetAddress: form.get("street-address"),
            city: form.get("city"),
            region: form.get("region"),
            postalCode: form.get("postal-code"),
            comments: form.get("comments") === "on",
            candidates: form.get("candidates") === "on",
            offers: form.get("offers") === "on",
            pushNotifications: form.get("push-notifications"),
            availableNow: form.get("available-now") === "on",
            b2b: form.get("b2b") === "on",
        });
        if (!valid.success) {
            const errors = valid.error.flatten().fieldErrors;
            alert(JSON.stringify(errors, null, 2));
        } else {
            alert(JSON.stringify(valid.data, null, 2));
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="m-auto max-w-2xl p-10">
    <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
                Profile
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                <div class="sm:col-span-4">
                    <Input
                        name="username"
                        label="Username"
                        autocomplete="username"
                        bind:value={user.username}
                    />
                </div>

                <div class="col-span-full">
                    <Input
                        name="about"
                        label="About"
                        bind:value={user.about}
                        rows={3}
                        helper="Write a few sentences about yourself."
                    />
                </div>

                <div class="col-span-full">
                    <label
                        for="photo"
                        class="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Photo
                    </label>
                    <div class="mt-2 flex items-center gap-x-3">
                        <svg
                            class="h-12 w-12 text-gray-300"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <button
                            type="button"
                            class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Change
                        </button>
                    </div>
                </div>

                <div class="col-span-full">
                    <Dropzone
                        name="photo"
                        label="Cover photo"
                        bind:file={user.photo}
                        description="SVG, PNG, JPG, GIF up to 10MB"
                        accept="image/*"
                    />
                </div>
            </div>
        </div>

        <div class="border-b border-gray-900/10 pb-6">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
                Personal Information
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <Input
                        name="first-name"
                        label="First name"
                        autocomplete="given-name"
                        bind:value={user.firstName}
                    />
                </div>

                <div class="sm:col-span-3">
                    <Input
                        name="last-name"
                        label="Last name"
                        autocomplete="family-name"
                        bind:value={user.lastName}
                    />
                </div>

                <div class="sm:col-span-4">
                    <Input
                        name="email"
                        label="Email address"
                        autocomplete="email"
                        bind:value={user.email}
                    />
                </div>

                <div class="sm:col-span-3">
                    <Select
                        name="country"
                        label="Country"
                        bind:value={user.country}
                        options={countries}
                    />
                </div>

                <div class="col-span-full">
                    <Input
                        name="street-address"
                        label="Street address"
                        bind:value={user.streetAddress}
                        autocomplete="street-address"
                    />
                </div>

                <div class="sm:col-span-2 sm:col-start-1">
                    <Input
                        name="city"
                        label="City"
                        bind:value={user.city}
                        autocomplete="address-level2"
                    />
                </div>

                <div class="sm:col-span-2">
                    <Input
                        name="region"
                        label="State / Province"
                        bind:value={user.region}
                        autocomplete="address-level1"
                    />
                </div>

                <div class="sm:col-span-2">
                    <Input
                        name="postal-code"
                        label="ZIP / Postal"
                        bind:value={user.postalCode}
                        autocomplete="postal-code"
                    />
                </div>
            </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
                Notifications
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
            </p>

            <div class="mt-10 space-y-10">
                <fieldset>
                    <legend
                        class="text-sm font-semibold leading-6 text-gray-900"
                    >
                        By Email
                    </legend>
                    <div class="mt-6 space-y-6">
                        <Checkbox
                            name="comments"
                            label="Comments"
                            bind:checked={user.comments}
                            description="Get notified when someones posts a comment on a posting."
                        />
                        <Checkbox
                            name="candidates"
                            label="Candidates"
                            bind:checked={user.candidates}
                            description="Get notified when a candidate applies for a job."
                        />
                        <Checkbox
                            name="offers"
                            label="Offers"
                            bind:checked={user.offers}
                            description="Get notified when a candidate accepts or rejects an offer."
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend
                        class="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Push Notifications
                    </legend>
                    <p class="mt-1 text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                    </p>
                    <div class="mt-6 space-y-6">
                        <Radio
                            id="push-{pushNotifications[0]}"
                            name="push-notifications"
                            label="Everything"
                            value={pushNotifications[0]}
                            bind:group={user.pushNotifications}
                        />
                        <Radio
                            id="push-{pushNotifications[1]}"
                            name="push-notifications"
                            label="Same as email"
                            value={pushNotifications[1]}
                            bind:group={user.pushNotifications}
                        />
                        <Radio
                            id="push-{pushNotifications[2]}"
                            name="push-notifications"
                            label="No push notifications"
                            value={pushNotifications[2]}
                            bind:group={user.pushNotifications}
                        />
                    </div>
                </fieldset>
            </div>
        </div>
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
                Hire Me
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
                If you want to hire me, please fill out the following form.
            </p>
            <div class="mt-6 space-y-6">
                <Switch
                    name="available-now"
                    label="Available now"
                    bind:checked={user.availableNow}
                />
                <Switch name="b2b" label="B2B" bind:checked={user.b2b} />
            </div>
        </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
        <Button type="button" variant="link">Cancel</Button>
        <Button>Save</Button>
    </div>
</form>
