<script lang="ts">
    import Selector from "../components/selector.svelte";
    import { Game } from "../lib/game";

    let fixed: [string, string] = ["uncle", "range"]
    let options: [string, string, string] = ["see", "translate", "gutter"]

    let game = new Game(["Blake", "Jordana"]);
    let roundOutcome = ""

    function onSelect(event) {
        roundOutcome = game.play(event.detail.choices)
        game = game;
    }
</script>

{ game.getState() }
<br>
{ game.balanceString() }
<br>
{ roundOutcome }

<Selector {fixed} {options} on:select={onSelect}></Selector>