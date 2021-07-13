<script lang="ts">
    import { goto } from "$app/navigation"
    import { ethereumProvider } from "$lib/eth";
    import { onMount } from "svelte";

    let myAddress = ""
    let theirAddress = ""

    onMount(async() => {
        let provider = await ethereumProvider()
        myAddress = await provider.getSigner().getAddress()
    })
</script>

<button disabled={!theirAddress} on:click={()=>{goto(`game?a=${myAddress}&b=${theirAddress}`)}}>Challenge</button>
<input type="text" placeholder="Opponent's Address" bind:value={theirAddress}>