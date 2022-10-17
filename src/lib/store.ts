import { persistLocalStorageStore } from './localStorageStore';
export type Task = {
	id: string;
	title: string;
	duration: number;
	done: boolean;
};
export type Tasks = {
	currentSession: Task[];
	nextSession: Task[];
};
const tasks: Tasks = {
	currentSession: [],
	nextSession: []
};
export const store = persistLocalStorageStore('tasks', tasks);
