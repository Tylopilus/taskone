<script lang="ts">
	import AddTask from './AddTask.svelte';
	import type { Task, Tasks } from './store';
	import { store } from './store';
	import TaskItem from './Task.svelte';

	export let title: string;
	export let tasks: Task[];
	export let current = false;
	const bgColor = current ? '--gray-7' : '--gray-8';

	const moveToCurrentHandler = () => {
		store.update((state: Tasks) => {
			const newState = {
				...state,
				nextSession: [...state.nextSession.filter((task) => task.done)],
				currentSession: [
					...state.currentSession,
					...state.nextSession.map((task): Task => {
						return {
							...task,
							status: 'inProgress'
						};
					})
				]
			};
			return newState;
		});
	};

	const clearCurrentHandler = () => {
		store.update((state: Tasks) => {
			return {
				...state,
				currentSession: state.currentSession.filter((task) => !task.done)
			};
		});
	};
</script>

<section style="--bgColor: var({bgColor})">
	<div class="headline">
		<span>{title}</span>
		{#if current}
			<div>
				<button on:click={clearCurrentHandler}>clear</button>
				<span>0h 32m</span>
			</div>
		{/if}
		{#if !current}
			<button on:click={moveToCurrentHandler}>move up ↑</button>
		{/if}
	</div>
	{#each tasks as task}
		<TaskItem {task} />
	{/each}
	{#if !current}
		<AddTask />
	{/if}
</section>

<style>
	section {
		width: 100%;
		max-inline-size: var(--size-content-2);
		background-color: var(--bgColor);
		box-shadow: var(--shadow-3);
		padding-inline: var(--size-2);
		padding-block: var(--size-3);
		border-radius: var(--radius-3);
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}
	.headline {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: var(--size-3);
		color: var(--gray-1);
	}
	.headline > div {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	button {
		background: unset;
		border: 1px solid var(--gray-4);
		padding-inline: var(--size-3);
		padding-block: var(--size-1);
		font-size: var(--font-size-0);
		border-radius: var(--radius-round);
	}
	button:hover {
		background-color: var(--gray-7);
	}
</style>
