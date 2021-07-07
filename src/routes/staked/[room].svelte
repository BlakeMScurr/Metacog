<script lang="ts">
    import { newProvider } from "$lib/eth";
    import { onMount } from "svelte";
    import { ethers } from "ethers";

    onMount(async () => {
        let provider = await newProvider()
        let address = await provider.getSigner().getAddress()
        let balance = await provider.getBalance(address)
        let eth = ethers.utils.formatEther(balance)
        console.log(`The logged in account has ${eth} Eth`)
    })
</script>