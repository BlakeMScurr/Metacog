<script lang="ts">
    import Selector from "../components/selector.svelte";
    import { Game, state } from "../lib/game";
    import { nouns } from "../lib/nouns";
    import { adjectives } from "../lib/adjectives";

    let fixed: [string, string] = ["", ""];
    let options: [string, string, string] = ["", "", ""];
    function randomiseWords() {
        options[0] = nouns[Math.floor(Math.random() * nouns.length)]
        options[1] = nouns[Math.floor(Math.random() * nouns.length)]
        options[2] = nouns[Math.floor(Math.random() * nouns.length)]
        fixed[0] = adjectives[Math.floor(Math.random() * adjectives.length)]
        fixed[1] = adjectives[Math.floor(Math.random() * adjectives.length)]
        fixed = fixed
        options = options
    }

    randomiseWords()


    let game = new Game(["Blake", "Jordana"]);
    let roundOutcome: [string, (fixed: [string, string], options: [string, string, string]) => string] = ["", ()=>{return ""}]
    let pairingsExplanation = ""

    function onSelect(event) {
        roundOutcome = game.play(event.detail.choices)
        pairingsExplanation = roundOutcome[1](fixed, options)
        game = game;
        if (game.getState() === state.ASelect || game.getState() === state.BSelect) {
            randomiseWords()
        }
    }
</script>

{ game.describeState() }
<br>
{ game.balanceString() }
<br>
{ roundOutcome[0] }
<br>
{ pairingsExplanation }

<Selector {fixed} {options} on:select={onSelect}></Selector>