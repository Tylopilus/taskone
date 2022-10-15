<script>
	import SessionBlock from '$lib/SessionBlock.svelte';
	import '../app.postcss';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<SessionBlock title="Current Session" current />
<SessionBlock title="Next Session" />
