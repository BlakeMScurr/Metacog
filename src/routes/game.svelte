<script lang="ts">
    import { page } from '$app/stores';
    import { ethereumProvider, sign } from '$lib/eth';
    import { castTurn, nullTurn } from '$lib/turn/turn';
    import type { turn } from '$lib/turn/turn';
    import { onMount } from 'svelte';
    import { myTurn, player } from '$lib/util';
    import { generateComponentMapping } from '$lib/turn/components/components';
    import Treasury from '../components/treasury.svelte';

    let a
    let b
    let myAddress
    let statePollInterval
    let state = new nullTurn()
    let makeComponent
    page.subscribe((pg) => {
		a = pg.query.get("a")
		b = pg.query.get("b")
        if (a === b) throw new Error(`You can't play against yourself`)
	})

    let playerA = null
    onMount(async() => {
        let provider = await ethereumProvider()
        myAddress = await provider.getSigner().getAddress()
        if (myAddress === a) {
            playerA = true
        } else if (myAddress === b) {
            playerA = false
        }

        statePollInterval = setInterval(async () => {
            let result = await(await fetch(`/api/getState?a=${a}&b=${b}`)).json()
            let newState = castTurn(result.state)
            if (!state || state.turn < newState.turn) {
                state = newState
            }
        }, 500)

        makeComponent = await generateComponentMapping()
    })

    async function updateState(event) {
        let payload = {
            state: event.detail,
            signature: await sign(await ethereumProvider(), event.detail)
        }
		fetch(`/api/updateState?a=${a}&b=${b}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(payload),
		}).then((response) => {
			if (response.ok) {
				state = event.detail
			}
		})
    }
</script>

{#if playerA === null}
    <p>You are joined as an observer</p>
{:else}
    <p>You are joined as Player {playerA?"A":"B"}</p>
{/if}

<p>{state.explain()}</p>

{#if playerA !== null && (myTurn(state.turn + 1, playerA) || state.done())} <!-- if state.done() we want the UI to tell us we're done, so we need the state's component -->
    {#if makeComponent}
        <svelte:component this={makeComponent(state).component} {...makeComponent(state).props} on:nextTurn={updateState}/>
    {/if}
{:else}
    <p>Waiting for {player(state.turn + 1)}</p>
{/if}

<Treasury t={state.treasury}></Treasury>
