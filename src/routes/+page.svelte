<script lang="ts">
	import SessionBlock from '$lib/SessionBlock.svelte';
	import { taskStore } from '$lib/store';
	import '../app.postcss';

	let start = false;
	let interVal: ReturnType<typeof setInterval> | null = null;
	$: timer = 0;
	$: if (start && interVal === null) {
		timer = 0;
		interVal = setInterval(() => {
			timer += 1;
			taskStore.update((state) => {
				const newState = {
					...state,
					currentSession: state.currentSession.map((task) => {
						if (task.status === 'inProgress') {
							task.timeWorkedOn += 1;
						}
						return task;
					})
				};
				return newState;
			});
		}, 1000);
	}
	$: if (!start && interVal) {
		clearInterval(interVal);
		interVal = null;
	}
</script>

<svelte:head>
	<title>TaskOne | Track your tasks with ease</title>
	<meta name="description" content="TaskOne | Track your tasks with ease" />
</svelte:head>
<div class="wrapper">
	<div>
		<button
			on:click={() => {
				start = !start;
			}}
		>
			{#if !start}
				Start
			{:else}
				Stop
			{/if}
		</button>
		<SessionBlock title="Current Session" current tasks={$taskStore.currentSession} time={timer} />
	</div>
	<SessionBlock title="Next Session" tasks={$taskStore.nextSession} />
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: var(--size-7);
	}
	div > button {
		display: flex;
		justify-content: end;
		margin-inline-start: auto;
		margin-inline-end: var(--size-5);
		margin-block-end: var(--size-3);
		background: var(--gray-9);
		border: 1px solid var(--gray-3);
		border-radius: var(--radius-round);
		padding-inline: var(--size-3);
	}
	div > div {
		width: 100%;
		max-inline-size: var(--size-content-2);
	}
</style>
