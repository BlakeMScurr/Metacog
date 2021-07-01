<script lang="ts">
import type { treasury } from "$lib/turn/treasury";

    export let t: treasury;
</script>

<div>
    <h1>Treasury</h1>
    <div>A: {t.a}</div>
    <div>B: {t.b}</div>
    <div>Pot: {t.pot}</div>
    <div>Burned: {t.burned()}</div>
</div>