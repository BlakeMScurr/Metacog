<script lang="ts">
    import Selector from "../components/selector.svelte";
    import { Game, state } from "../lib/game";
    import * as nouns from "../lib/nouns";
    import * as adjectives from "../lib/adjectives";

    let fixed: [string, string] = ["", ""];
    let options: [string, string, string] = ["", "", ""];
    function randomiseWords() {
        options[0] = nouns.default[Math.floor(Math.random() * nouns.default.length)]
        options[1] = nouns.default[Math.floor(Math.random() * nouns.default.length)]
        options[2] = nouns.default[Math.floor(Math.random() * nouns.default.length)]
        fixed[0] = adjectives.default[Math.floor(Math.random() * adjectives.default.length)]
        fixed[1] = adjectives.default[Math.floor(Math.random() * adjectives.default.length)]
        fixed = fixed
        options = options
    }

    randomiseWords()


    let game = new Game(["Blake", "Jordana"]);
    let roundOutcome: [string, (fixed: [string, string], options: [string, string, string]) => string] = ["", ()=>{return ""}]

    function onSelect(event) {
        roundOutcome = game.play(event.detail.choices)
        if (game.getState() === state.ASelect || game.getState() === state.BSelect) {
            randomiseWords()
        }
        game = game;
    }
</script>

{ game.describeState() }
<br>
{ game.balanceString() }
<br>
{ roundOutcome[0] }
<br>
{ roundOutcome[1](fixed, options) }

<Selector {fixed} {options} on:select={onSelect}></Selector>