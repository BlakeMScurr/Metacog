<script lang="ts">
    import { ethereumProvider } from "$lib/eth";
    import {  onMount } from "svelte";
    import { page } from '$app/stores';

    let challenger = ""
	page.subscribe((pg) => {
		challenger = pg.params.challenger
	})

    onMount(async () => {
        let provider = await ethereumProvider()
        let accepter = await provider.getSigner().getAddress()

        let response = await fetch(`/api/joinChallenge?challenger=${challenger}&accepter=${accepter}`)
        console.log(response.ok)
        let json = await response.json()
        console.log(json)
    })
</script>