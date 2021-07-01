<script lang=ts>
    import { newDone, newGuess, newSelect, randomDraw } from "../lib/turn/transition";
    import type { drawTurn, guessTurn, selectTurn, turn } from "../lib/turn/turn";
    import Treasury from "../components/treasury.svelte";
    import Selection from "../components/selection.svelte";
    import { adjectivesOf, nounsOf } from "$lib/util";
    import { assertValidTransition } from "$lib/turn/assertions/transition";
    import { treasury } from "$lib/turn/treasury";

    let state: turn = randomDraw(0, new treasury());

    function player(turn: number):string {
        return turn % 2 === 0 ? "A" : "B"
    }

    function onSelect(event) {
        let select = newSelect(<drawTurn>state, event.detail.choices)
        assertValidTransition(state, select)
        state = select
    }

    function onGuess(event) {
        let guess = newGuess(<selectTurn>state, event.detail.choices)
        assertValidTransition(state, guess)
        state = guess
    }

    function onDraw() {
        let draw = randomDraw(state.turn + 1, state.treasury)
        assertValidTransition(state, draw)
        state = draw
    }

    function onDone() {
        let done = newDone(<guessTurn>state)
        assertValidTransition(state, done)
        state = done
    }
</script>

<p>{state.explain()}</p>

{#if state.kind() === "draw"}
    <p>Player {player(state.turn + 1)}, please pair up the following words without showing {player(state.turn)}</p>
    <Selection 
        fixed={nounsOf(state.fixed)}
        options={adjectivesOf(state.options)}
        on:select={onSelect}
    ></Selection>
{:else if state.kind() === "select"}
    <p>Player {player(state.turn + 1)}, please guess how player {player(state.turn)} paired the following words</p>
    <Selection 
        fixed={nounsOf(state.fixed)}
        options={adjectivesOf(state.options)}
        on:select={onGuess}
    ></Selection>
{:else if state.kind() === "guess"}
    {#if state.treasury.pot > 0}
        <button on:click={onDraw}>Generate new words</button>
    {:else}
        <button on:click={onDone}>Finish game</button>
    {/if}
{:else if state.kind() === "done"}
    <button on:click={()=>{
        state = randomDraw(0, new treasury())
    }}>Play again</button>
{/if}

<Treasury t={state.treasury}></Treasury>