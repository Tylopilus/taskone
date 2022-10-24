<script lang="ts">
	import type { Task, Tasks } from './store';
	import { store } from './store';
	export let task: Task;
	// const time = new Date(task.duration * 1000);
	$: time = new Date(
		(
			$store.nextSession.find((storeTask) => storeTask.id === task.id) ||
			$store.currentSession.find((storeTask) => storeTask.id === task.id)
		)?.duration! * 1000 || 0
	);
	$: minutes = time.getMinutes() + (time.getHours() - 1) * 60;
	// const minutes = time.getMinutes() + (time.getHours() - 1) * 60;
	let editable = false;
	const checkHandler = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (e.currentTarget.checked) {
			task.done = true;
			store.update((state) => {
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
		const taskId =
			$store.nextSession.find((storeTask) => storeTask.id === task.id) ||
			$store.currentSession.find((storeTask) => storeTask.id === task.id);
		store.update((state): Tasks => {
			return {
				...state,
				nextSession: state.nextSession.map((storeTask) => {
					if (storeTask.id === taskId?.id) {
						return {
							...storeTask,
							duration: parseInt(e.currentTarget.value || '0') * 60
						};
					}
					return storeTask;
				}),
				currentSession: state.currentSession.map((storeTask) => {
					if (storeTask.id === taskId?.id) {
						return {
							...storeTask,
							duration: parseInt(e.currentTarget.value || '0') * 60
						};
					}
					return storeTask;
				})
			};
		});
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
			<input type="number" step="5" autofocus on:blur={blurHandler} value={minutes} />
		</div>
	{:else}
		<span on:click={() => (editable = !editable)}>{`${minutes}m`}</span>
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
