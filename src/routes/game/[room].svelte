<script lang="ts">
	import { page } from '$app/stores';
	import { seat } from '../../client/room';
	import { onMount } from 'svelte';
	import type { turn } from '$lib/turn/turn';
	
	let room = ""
	let info = "Joining room"

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

			setInterval(async () => {
				let result = await fetch(`/api/getState?room=${room}`)
				state = await result.json()
			}, 500)

		} else {
			// TODO: use a real Error page
			info = "couldn't join room"
		}
		
	})
</script>

<p>{info}</p>

{#if !state}
	<p>Waiting for a second player to join the room</p>
{/if}