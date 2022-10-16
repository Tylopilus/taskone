<script lang="ts">
	import { browser } from '$app/environment';

	import SessionBlock from '$lib/SessionBlock.svelte';
	import { store } from '$lib/store';
	import '../app.postcss';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div>
	<SessionBlock title="Current Session" current tasks={$store.currentSession} />
	<SessionBlock title="Next Session" tasks={$store.nextSession} />
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
