<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { assertValidTransition } from "../assertions/transition";
    import { randomDraw } from "../transition";

    import type { guessTurn } from "../turn";

    export let state: guessTurn

    let dispatch = createEventDispatcher()

    function onDraw() {
        let draw = randomDraw(state.turn + 1, state.treasury)
        assertValidTransition(state, draw)
        dispatch("nextTurn", draw)
    }
</script>

{#if state.treasury.pot > 0}
    <button on:click={onDraw}>Generate new words</button>
{:else}
    <p>Game over</p>
{/if}