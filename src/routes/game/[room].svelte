<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let room = ""
	

	onMount(() => {
		page.subscribe((pg) => {
			room = pg.params.room		
		})
	})
</script>

{room}