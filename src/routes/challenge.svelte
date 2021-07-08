<script lang="ts">
    import { ethereumProvider } from "$lib/eth";
    import { challengeExpiration } from "../server/staked";
    import { onDestroy, onMount } from "svelte";

    let challengeCreated = null
    let createdAt
    let expiringIn
    let timeUpdate = setInterval(() => {
        expiringIn = createdAt + challengeExpiration - Date.now()
    }, 50)

    onMount(async () => {
        let provider = await ethereumProvider()
        let challenger = await provider.getSigner().getAddress()
        let response = await fetch(`/api/addChallenge?challenger=${challenger}`)
        challengeCreated = response.ok
        if (challengeCreated) {
            let json = await response.json()
            createdAt = json.createdAt
        }
    })

    onDestroy(() => {
        clearInterval(timeUpdate)
    })
</script>

{#if challengeCreated === null}
    <p>Creating challenge...</p>
{:else if challengeCreated}
    <p>Challenge created, waiting for someone to accept</p>
    {#if expiringIn > 0}
        <p>Challenge expiring in {Math.floor((expiringIn)/1000)}</p>
    {:else}
        <p>Challenge expired</p>
    {/if}
    <p>Refresh page to refresh challenge</p>


{:else}
    <p>Could not create challenge :/</p>
{/if}


