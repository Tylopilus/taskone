import { get } from 'svelte/store';
import { persistLocalStorageStore } from './localStorageStore';
export type Task = {
	id: string;
	title: string;
	duration: number;
	done: boolean;
	timeWorkedOn: number;
	status: 'backlog' | 'inProgress' | 'paused';
};
export type Tasks = {
	currentSession: Task[];
	nextSession: Task[];
};
const tasks: Tasks = {
	currentSession: [],
	nextSession: []
};
export const taskStore = persistLocalStorageStore('tasks', tasks);

export const getTask = (id: string) => {
	const task =
		get(taskStore).nextSession.find((task) => task.id === id) ||
		get(taskStore).currentSession.find((task) => task.id === id);
	return task;
};

export const updateTask = (id: string, taskInput: Task) => {
	const tasks = get(taskStore);
	const currentSession = tasks.currentSession.map((task) =>
		task.id === id ? { ...task, ...taskInput } : task
	);
	const nextSession = tasks.nextSession.map((task) =>
		task.id === id ? { ...task, ...taskInput } : task
	);
	taskStore.set({ currentSession, nextSession });
};

export const addTask = (task: Task) => {
	const tasks = get(taskStore);
	const nextSession = [...tasks.nextSession, task];
	taskStore.update((tasks) => ({ ...tasks, nextSession }));
};
