<script lang="ts">
    import { adjectivesOf, nounsOf, player } from "$lib/util";
    import Selection from "../../../components/Selection.svelte";
    import { createEventDispatcher } from "svelte";
    import { assertValidTransition } from "../assertions/transition";
    import { newGuess } from "../transition";

    import type { selectTurn } from "../turn";

    export let state: selectTurn;

    let dispatch = createEventDispatcher()

    function onGuess(event) {
        let guess = newGuess(<selectTurn>state, event.detail.choices)
        assertValidTransition(state, guess)
        dispatch("nextTurn", guess)
    }
</script>

<p>Player {player(state.turn + 1)}, please guess how player {player(state.turn)} paired the following words</p>
    <Selection 
        fixed={nounsOf(state.fixed)}
        options={adjectivesOf(state.options)}
        on:select={onGuess}
    ></Selection>