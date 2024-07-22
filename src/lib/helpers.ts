export function generateId(): string {
	const timestamp = new Date().getTime().toString(36);
	const random = Math.random().toString(36).substring(2, 5); // Use a portion of the random number
	return timestamp + random;
}
