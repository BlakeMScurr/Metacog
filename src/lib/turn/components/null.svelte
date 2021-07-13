<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { assertValidTransition } from "../assertions/transition";
    import { randomDraw } from "../transition";
    import { treasury } from "../treasury";
    import type { nullTurn } from "../turn";
    
    export let state: nullTurn;

    let dispatch = createEventDispatcher()

    function proposeGame() {
        let select = randomDraw(1, new treasury())
        assertValidTransition(state, select)
        dispatch("nextTurn", select)
    }
</script>

<button on:click={proposeGame}>Propose Game</button>