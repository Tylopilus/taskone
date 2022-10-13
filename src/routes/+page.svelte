<script>
	import '../app.postcss';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="headline">
		<span>Current Session</span>
		<span>0h 32m</span>
	</div>
	<div class="task">
		<div>
			<input type="checkbox" name="checkbox" id="checkbox" />
			<label for="checkbox">Get Stuff done</label>
		</div>
		<span>25m</span>
	</div>
</section>

<style>
	section {
		width: 100%;
		max-inline-size: var(--size-content-2);
		background-color: var(--gray-7);
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
	.task {
		background-color: var(--gray-9);
		border-radius: var(--radius-3);
		padding-inline: var(--size-7);
		padding-block: var(--size-4);
		display: flex;
		justify-content: space-between;
	}
	.task > div {
		display: flex;
		align-items: center;
	}
	.task > div > label {
		margin-inline-start: var(--size-3);
	}
	.task > span {
		color: var(--gray-9);
		background-color: var(--gray-1);
		border-radius: var(--radius-round);
		padding-inline: var(--size-3);
	}
</style>
