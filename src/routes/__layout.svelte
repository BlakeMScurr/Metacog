<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { page } from '$app/stores';

    let path;
    page.subscribe((pg) => {
        path = pg.path
    })
    onMount(()=>{
        const installMetaMask = "/installMetaMask"
        if ((typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) && path !== installMetaMask) {
            console.log(path, installMetaMask, path !== installMetaMask)
            goto(installMetaMask)
        }
    })
</script>

<slot></slot>