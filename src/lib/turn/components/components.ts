// Only call this inside an onMount function
// This is an alternative to having a component method on each turn class, which results in circular dependencies

import type { turn } from '../turn'

// We impont the components here to avoid an "invalid ssr bug", the explanation of the solution is at https://github.com/sveltejs/sapper/issues/774#issuecomment-663048738
export async function generateComponentMapping () {
    let mapping: Map<string, any> = new Map([
        ["null", (await import('./null.svelte')).default],
        ["draw", (await import('./draw.svelte')).default],
        ["select", (await import('./select.svelte')).default],
        ["guess", (await import('./guess.svelte')).default],
    ])

    return (t: turn) => {
        if (!mapping.has(t.kind)) throw new Error(`Turn kind ${t.kind} has no component`)
        return { 
            component: mapping.get(t.kind),
            props: {
                state: t,
            }
        }
    }
}