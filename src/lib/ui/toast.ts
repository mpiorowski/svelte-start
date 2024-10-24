import { writable, type Writable } from 'svelte/store';

export type Toast = {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	title: string;
	description: string;
	duration: number;
	action?: { label: string; onClick: () => void };
};

export const toastStore: Writable<Toast[]> = writable([]);

export function showToast(toast: Toast): void {
	toastStore.update((toasts) => [...toasts, toast]);
	setTimeout(() => {
		toastStore.update((toasts) => {
			return toasts.filter((t) => t.id !== toast.id);
		});
	}, toast.duration);
}

export const toast = {
	success: (title: string, description = '') =>
		showToast({
			id: Symbol().toString(),
			title,
			description,
			type: 'success',
			duration: 5000,
		}),
	error: (title: string, description = '') =>
		showToast({
			id: Symbol().toString(),
			title,
			description,
			type: 'error',
			duration: 5000,
		}),
	warning: (title: string, description = '') =>
		showToast({
			id: Symbol().toString(),
			title,
			description,
			type: 'warning',
			duration: 5000,
		}),
	info: (title: string, description = '') =>
		showToast({
			id: Symbol().toString(),
			title,
			description,
			type: 'info',
			duration: 5000,
		}),
};
