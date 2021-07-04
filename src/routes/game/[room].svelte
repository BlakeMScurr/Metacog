<script lang="ts">
	import { page } from '$app/stores';
	import { seat } from '../../client/room';
	import { onDestroy, onMount } from 'svelte';
	import { castTurn } from '../../lib/turn/turn';
	import type { turn } from '../../lib/turn/turn';
	import { generateComponentMapping } from '$lib/turn/components/components';
	
	let room = ""
	let info = "Joining room"

	let statePollInterval;
	let state: turn;
	let makeComponent;
	let jwt;

	page.subscribe((pg) => {
		room = pg.params.room
	})
	
	onMount(async () => {
		// join the room and poll for state
		let result = await fetch(`/api/joinRoom?room=${room}`)
		if (result.ok) {
			let json = await result.json()
			jwt = json.jwt
			let s = new seat(jwt, json.playerA, room)
			info = `joined room ${s.room} as player ${s.playerA ? "A" : "B"}`

			statePollInterval = setInterval(async () => {
				let result = await fetch(`/api/getState?room=${room}&jwt=${jwt}`)
				let stateJSON = await result.json()
				if (stateJSON.state) {
					let newState = castTurn(JSON.parse(stateJSON.state))
					if (!state ||state.turn < newState.turn) {
						state = newState
					}
				}
			}, 500)
		} else {
			info = "couldn't join room" // TODO: use a real Error page
		}

		// load the turn components
		makeComponent = await generateComponentMapping()
	})

	onDestroy(() => {
		clearInterval(statePollInterval)
	})

	function updateState(event) {
        state = event.detail
		fetch(`/api/updateState?room=${room}&jwt=${jwt}`, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(state) // body data type must match "Content-Type" header
		});
    }
</script>

<p>{info}</p>

{#if !state}
	<p>Waiting for a second player to join the room</p>
{:else}	
	{#if makeComponent}
		<svelte:component this={makeComponent(state).component} {...makeComponent(state).props} on:nextTurn={updateState}/>
	{/if}
{/if}