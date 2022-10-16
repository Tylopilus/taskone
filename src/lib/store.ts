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
	currentSession: [
		{
			id: '1',
			title: 'Current Session Task',
			duration: 75 * 60,
			done: false
		}
	],
	nextSession: [
		{
			id: '2',
			title: 'Next Session Task',
			duration: 25 * 60,
			done: false
		}
	]
};
export const store = persistLocalStorageStore('tasks', tasks);
