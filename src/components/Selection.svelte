<script lang="ts">
    import { createEventDispatcher } from "svelte"

    let dispatch = createEventDispatcher()

    export let fixed: [string, string];
    export let options: [string, string, string];
    let choices: Array<string | number> = [-1, -1]
        
    function onChange(i) {
        return () => {
            // we can't have the same word option for both fixed words
            if (choices[0] === choices[1]) choices[(i+1)%2] = -1
        }
    }
</script>

{#each fixed as fixedWord, i}
    <h2>{fixedWord}</h2>
    <div>
        {#each options as option}
            <input type="radio" bind:group={choices[i]} id={option} name={"option" + i} value={option} on:change={onChange(i)}>
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
        choices.includes(-1)
    }
>
    Confirm
</button>