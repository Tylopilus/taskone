import { browser } from '$app/environment';
import { writable, type Unsubscriber } from 'svelte/store';
import type { Tasks } from './store';

export const persistLocalStorageStore = (key: string, initial: Tasks) => {
	if (!browser) return writable(initial);
	const persist = localStorage.getItem(key);
	const data = persist ? JSON.parse(persist) : initial;
	const store = writable<Tasks>(data, () => {
		const unsub: Unsubscriber = store.subscribe((value: Tasks) => {
			if (browser) {
				localStorage.setItem(key, JSON.stringify(value));
			}
		});
		return unsub;
	});
	return store;
};
