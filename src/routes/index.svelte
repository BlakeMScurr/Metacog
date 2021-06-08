<script lang="ts">
    import Selector from "../components/Selector.svelte";

    function onSelect(event) {
        console.log(event.detail.choices)
    }
</script>

<Selector on:select={onSelect}></Selector>