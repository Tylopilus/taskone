<script lang="ts">
	import AddTask from './AddTask.svelte';
	import type { Task } from './store';
	import { store } from './store';
	import TaskItem from './Task.svelte';

	export let title: string;
	export let tasks: Task[];
	export let current = false;
	const bgColor = current ? '--gray-7' : '--gray-8';

	const buttonHandler = () => {
		store.update((state) => {
			return {
				...state,
				nextSession: [...state.nextSession.filter((task) => task.done)],
				currentSession: [...state.currentSession, ...state.nextSession]
			};
		});
	};
</script>

<section style="--bgColor: var({bgColor})">
	<div class="headline">
		<span>{title}</span>
		{#if current}
			<span>0h 32m</span>
		{/if}
		{#if !current}
			<button on:click={buttonHandler}>move up ↑</button>
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
		justify-content: space-between;
		padding-inline: var(--size-3);
		color: var(--gray-1);
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
