<script context="module" lang="ts">
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
</script>

<script lang="ts">
	import SessionBlock from '$lib/SessionBlock.svelte';
	import '../app.postcss';
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
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div>
	<SessionBlock title="Current Session" current tasks={tasks.currentSession} />
	<SessionBlock title="Next Session" tasks={tasks.nextSession} />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: var(--size-7);
	}
</style>
