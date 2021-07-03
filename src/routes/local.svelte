<script lang=ts>
    import { newDone, newGuess, newSelect, randomDraw } from "../lib/turn/transition";
    import type { drawTurn, guessTurn, selectTurn, turn } from "../lib/turn/turn";
    import Treasury from "../components/treasury.svelte";
    import Selection from "../components/selection.svelte";
    import { adjectivesOf, nounsOf, player } from "$lib/util";
    import { assertValidTransition } from "$lib/turn/assertions/transition";
    import { treasury } from "$lib/turn/treasury";
import Draw from "$lib/turn/components/draw.svelte";

    let state: turn = randomDraw(0, new treasury());

</script>

<p>{state.explain()}</p>

{state.component()}

{#if state.kind === "draw"}
draw
{:else if state.kind === "select"}
    select
{:else if state.kind === "guess"}
    guess
{:else if state.kind === "done"}
    done
{/if}

<Treasury t={state.treasury}></Treasury>