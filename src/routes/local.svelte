<script lang=ts>
    import { randomDraw } from "../lib/turn/transition";
    import type { turn } from "../lib/turn/turn";
    import Treasury from "../components/treasury.svelte";
    import { treasury } from "$lib/turn/treasury";
    import { generateComponentMapping } from "$lib/turn/components/components";
    import { onMount } from "svelte";

    let state: turn = randomDraw(0, new treasury());

    let makeComponent;
    onMount(async () => {
        makeComponent = await generateComponentMapping()
    })

    function updateState(event) {
        state = event.detail
    }

</script>

<p>{state.explain()}</p>

{#if makeComponent}
    <svelte:component this={makeComponent(state).component} {...makeComponent(state).props} on:nextTurn={updateState}/>
{/if}

<Treasury t={state.treasury}></Treasury>