<script lang="ts">
	import type { Task } from 'src/routes/+page.svelte';
	export let task: Task;
	const setTime = new Date(task.duration * 1000);
</script>

<div class="task">
	<div>
		<input type="checkbox" name="checkbox" id="checkbox" checked={task.done} />
		<label for="checkbox">{task.title}</label>
	</div>
	<span>{`${setTime.getMinutes() + (setTime.getHours() - 1) * 60}m`}</span>
</div>

<style>
	.task {
		background-color: var(--gray-9);
		border-radius: var(--radius-3);
		padding-inline: var(--size-7);
		padding-block: var(--size-4);
		display: flex;
		justify-content: space-between;
		align-items: cneter;
		font-size: var(--font-size-3);
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
		font-size: var(--font-size-2);
		line-height: var(--font-lineheight-3);
		padding-inline: var(--size-3);
	}
</style>
