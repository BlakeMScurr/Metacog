<script lang="ts">
    import { newProvider } from "$lib/eth";
    import { onMount } from "svelte";

    onMount(async () => {
        let provider = await newProvider()
    })
</script>