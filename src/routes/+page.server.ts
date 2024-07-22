import { fail } from '@sveltejs/kit';

export type Profile = {
	id: string;
	created: string;
	updated: string;
	user_id: string;
	active: boolean;
	username: string;
	about: string;
	first_name: string;
	last_name: string;
	email: string;
	country: string;
	street_address: string;
	city: string;
	state: string;
	zip: string;
	email_notifications: string;
	push_notification: string;
	resume: string;
	cover: string;
	position: string;
	skills: string;
};
export const load: import('./$types').PageServerLoad = () => {
	const profile: Profile = {
		id: '1',
		created: '2021-01-01',
		updated: '2021-01-01',
		user_id: '1',
		active: true,
		username: '',
		about: 'I am a software engineer',
		first_name: 'John',
		last_name: 'Doe',
		email: 'admin@gmail.com',
		country: 'Poland',
		street_address: '123 Main St',
		city: 'New York',
		state: 'NY',
		zip: '10001',
		email_notifications: 'comments,candidates',
		push_notification: 'everything',
		resume: 'resume.pdf',
		cover: 'cover.pdf',
		position: 'Frontend Developer',
		skills: 'UI/UX Design | DevOps',
	};

	return {
		profile: profile,
	};
};

export const actions: import('./$types').Actions = {
	validate: async ({ request }) => {
		const form = await request.formData();
		const username = form.get('username')?.toString();
		if (!username) {
			return fail(500, {
				error: 'Form data is missing',
				fields: [{ field: 'username', tag: 'required' }],
			});
		}
		return { username };
	},
};
