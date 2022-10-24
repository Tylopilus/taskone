<script lang="ts">
	import SessionBlock from '$lib/SessionBlock.svelte';
	import { taskStore } from '$lib/store';
	import '../app.postcss';
</script>

<svelte:head>
	<title>TaskOne | Track your tasks with ease</title>
	<meta name="description" content="TaskOne | Track your tasks with ease" />
</svelte:head>
<div>
	<SessionBlock title="Current Session" current tasks={$taskStore.currentSession} />
	<SessionBlock title="Next Session" tasks={$taskStore.nextSession} />
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
