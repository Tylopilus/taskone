<script lang="ts">
	import { updateTask, type Task, type Tasks } from './store';
	import { taskStore } from './store';

	export let task: Task;
	let editable = false;

	$: minutes = () => {
		const time = new Date(task.duration * 1000 || 0);
		return time.getMinutes() + (time.getHours() - 1) * 60;
	};

	const checkHandler = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (e.currentTarget.checked) {
			task.done = true;
			taskStore.update((state) => {
				return {
					...state,
					nextSession: state.nextSession.filter((task) => task.id !== e.currentTarget.id)
				};
			});
		} else {
			task.done = false;
		}
	};

	const blurHandler = (
		e: FocusEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		editable = false;
		updateTask(task.id, { ...task, duration: parseInt(e.currentTarget.value || '0') * 60 });
	};
</script>

<div class="task">
	<div>
		<input
			type="checkbox"
			checked={task.done}
			name="checkbox"
			id={task.id}
			on:change|preventDefault={checkHandler}
		/>
		<label for={task.id}>{task.title}</label>
	</div>
	{#if editable}
		<div>
			<!-- svelte-ignore a11y-autofocus -->
			<input type="number" step="5" autofocus on:blur={blurHandler} value={minutes()} />
		</div>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span on:click={() => (editable = !editable)}>{`${minutes()}m`}</span>
	{/if}
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
		line-height: var(--font-lineheight-4);
		padding-inline: var(--size-3);
	}
	input:checked + label {
		text-decoration: line-through;
	}
</style>
