<script lang="ts">
	import cuid from 'cuid';
	import { store, type Tasks } from './store';

	let inputValue: string;

	const submitHandler = (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		store.update((state: Tasks) => ({
			...state,
			nextSession: [
				...state.nextSession,
				{
					id: cuid(),
					title: inputValue,
					done: false,
					duration: 0
				}
			]
		}));
		inputValue = '';
	};
</script>

<div class="task">
	<div>
		<form on:submit|preventDefault={(e) => submitHandler(e)}>
			<input bind:value={inputValue} type="text" placeholder="Add new task" />
		</form>
	</div>
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
		width: 100%;
	}
	input {
		width: 100%;
		background-color: var(--gray-9);
	}
</style>
