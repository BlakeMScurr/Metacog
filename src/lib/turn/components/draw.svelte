<script lang="ts">
    import { adjectivesOf, nounsOf, player } from "$lib/util";
    import { createEventDispatcher } from "svelte";
    import Selection from "../../../components/Selection.svelte";
    import { assertValidTransition } from "../assertions/transition";
    import { newSelect } from "../transition";
    import type { drawTurn } from "../turn";
    
    export let state: drawTurn;

    let dispatch = createEventDispatcher()

    function onSelect(event) {
        let select = newSelect(<drawTurn>state, event.detail.choices)
        assertValidTransition(state, select)
        dispatch("nextTurn", select)
    }
</script>

<p>Player {player(state.turn + 1)}, please pair up the following words without showing {player(state.turn)}</p>
<Selection 
    fixed={nounsOf(state.fixed)}
    options={adjectivesOf(state.options)}
    on:select={onSelect}
></Selection>