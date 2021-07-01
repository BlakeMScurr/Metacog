<script lang="ts">
    import { createEventDispatcher } from "svelte"

    let dispatch = createEventDispatcher()

    export let fixed: [string, string];
    export let options: [string, string, string];
    let choices: Array<string | number> = [-1, -1]
</script>

{#each fixed as fixedWord, i}
    <h2>{fixedWord}</h2>
    <div>
        {#each options as option}
            <input type="radio" bind:group={choices[i]} id={option} name={"option" + i} value={option}>
            <label for={option}>{option}</label>
        {/each}
    </div>
{/each}


<button 
    on:click={()=>{
        dispatch("select", { choices: choices.slice().map((word) => { return options.indexOf(String(word))}) });
        choices = [-1, -1];
    }}
    disabled={
        choices.includes(-1) || choices[0] === choices[1]
    }
>
    Confirm
</button>