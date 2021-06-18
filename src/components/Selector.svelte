<script lang="ts">
    import { createEventDispatcher } from "svelte"

    let dispatch = createEventDispatcher()

    export let fixed: [string, string];
    export let options: [string, string, string];
    let choices = [-1, -1]
        
    let draggedIndex = null
    let hoveredIndex = null
</script>

<style lang="scss">
    p {
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

    .fixed {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;

        .fixedWord {
            width: 100%;
            background-color: lightsteelblue;
        }

        .hover {
            background-color: orange;
        }
    }

    .options {
        display: grid;
        grid-template-columns:  1fr 1fr 1fr;
        grid-gap: 20px;

        p {
            background-color: lightsteelblue;
            width: 100%;

        }
    }
</style>

<div class="fixed">
    {#each fixed as word, i }
        <div>
            <p
                class="fixedWord"
                class:hover={hoveredIndex === i}
                on:dragenter={()=>{hoveredIndex=i; }}
                on:dragleave={()=>{hoveredIndex=null; }}
                on:drop={() => {
                    for (let j = 0; j < choices.length; j++) {
                        const choice = choices[j];
                        if (choices[j] === draggedIndex) {
                            choices[j] = -1
                        }
                        
                    }
                    choices[i] = draggedIndex;
                    hoveredIndex=null;
                }}
                ondragover="return false"
            >{word}</p>

            {#if choices[i] != -1}
                <p class="choiceWord">{options[choices[i]]}</p>
            {/if}
        </div>

    {/each}
</div>

<hr>

<div class="options">
    {#each options as word, i }
        <p draggable="true"
            on:dragstart={()=>{draggedIndex = i}}
        >
            {word}
        </p>
    {/each}
</div>

<button 
    on:click={()=>{
        console.log("hola")
        dispatch("select", { choices: choices.slice() });
        choices = [-1, -1];
        console.log("setting choices to nothing at all")
    }}
    disabled={
        choices.reduce((prev, curr) => {
            if (curr === -1) prev--
            return prev
        }) < 0
    }
>
    Confirm
</button>