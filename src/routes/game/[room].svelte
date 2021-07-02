<script lang="ts">
	import { page } from '$app/stores';
	import { seat } from '../../client/room';
	import { onMount } from 'svelte';
	
	let room = ""

	let info = ""

	page.subscribe((pg) => {
		room = pg.params.room
	})
	
	onMount(async () => {
		let result = await fetch(`/api/joinRoom?room=${room}`)
		if (result.ok) {
			let json = await result.json()
			let s = new seat(json.jwt, json.playerA, room)
			info = `joined room ${s.room} as player ${s.playerA ? "A" : "B"}`
		} else {
			// TODO: use a real Error page
			info = "couldn't join room"
		}
		
	})
</script>

{info}