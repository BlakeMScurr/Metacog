<script lang="ts">
	import { page } from '$app/stores';
	import { seat } from '../../client/room';
	import { onDestroy, onMount } from 'svelte';
	import { castTurn } from '../../lib/turn/turn';
	import type { turn } from '../../lib/turn/turn';
	
	let room = ""
	let info = "Joining room"

	let statePollInterval;
	let state: turn;

	page.subscribe((pg) => {
		room = pg.params.room
	})
	
	onMount(async () => {
		let result = await fetch(`/api/joinRoom?room=${room}`)
		if (result.ok) {
			let json = await result.json()
			let s = new seat(json.jwt, json.playerA, room)
			info = `joined room ${s.room} as player ${s.playerA ? "A" : "B"}`

			statePollInterval = setInterval(async () => {
				let result = await fetch(`/api/getState?room=${room}&jwt=${json.jwt}`)
				console.log(result)
				let stateJSON = await result.json()
				if (stateJSON.state) {
					state = castTurn(JSON.parse(stateJSON.state))
				}
			}, 500)

		} else {
			// TODO: use a real Error page
			info = "couldn't join room"
		}
		
	})

	onDestroy(() => {
		clearInterval(statePollInterval)
	})
</script>

<p>{info}</p>

{#if !state}
	<p>Waiting for a second player to join the room</p>
{:else}
	{state}
{/if}