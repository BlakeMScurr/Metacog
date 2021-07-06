<script lang="ts">
    import { onMount } from "svelte";
    console.log("in layout")
    let mounted;
    let metamaskInstalled;
    onMount(async ()=>{
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            metamaskInstalled = true
        }
        mounted = true
    })
</script>

{#if mounted}
    {#if metamaskInstalled}
        <slot></slot>
    {:else}
        <a href="https://metamask.io/">Install MetaMask</a>
    {/if}
{/if}