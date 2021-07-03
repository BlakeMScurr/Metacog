<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { randomDraw } from "../transition";
    import { treasury } from "../treasury";
    import type { doneTurn } from "../turn";

    export const state: doneTurn = null; // paramater satisfied implicit turn component interface
    let dispatch = createEventDispatcher()
</script>

<button on:click={()=>{
    dispatch("nextTurn", randomDraw(0, new treasury()))
}}>Play again</button>