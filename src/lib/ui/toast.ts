import { writable, type Writable } from 'svelte/store';
import { generateId } from '$lib/helpers';

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

export const toast: {
	success: (title: string, description?: string) => void;
	error: (title: string, description?: string) => void;
	warning: (title: string, description?: string) => void;
	info: (title: string, description?: string) => void;
} = {
	success: (title, description = '') =>
		showToast({
			id: generateId(),
			title,
			description,
			type: 'success',
			duration: 5000,
		}),
	error: (title, description = '') =>
		showToast({
			id: generateId(),
			title,
			description,
			type: 'error',
			duration: 5000,
		}),
	warning: (title, description = '') =>
		showToast({
			id: generateId(),
			title,
			description,
			type: 'warning',
			duration: 5000,
		}),
	info: (title, description = '') =>
		showToast({
			id: generateId(),
			title,
			description,
			type: 'info',
			duration: 5000,
		}),
};
