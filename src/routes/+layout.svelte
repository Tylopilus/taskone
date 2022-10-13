<script>
	// import '../app.postcss';
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		font-size: var(--font-size-4);
		display: flex;
		justify-content: center;
		margin-inline: auto;
		margin-block-start: var(--size-10);
		padding-inline: var(--size-8);
	}
</style>
