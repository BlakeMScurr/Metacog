<script lang="ts">
    import { goto } from "$app/navigation"
    import { newProvider, signNonce } from "$lib/eth";

    let roomCode = ""
    let staked = true
    $: roomType = staked ? "staked/" : "game/"

    async function newRoom() {
        let address = (await newProvider()).getSigner().getAddress()
        fetch(`/api/makeRoom?staked=${staked}&address=${address}`)
            .then(response => {
                return response.json()
            }).then(data => {
                goto(roomType + data.roomCode)
            })
    }

</script>

<button on:click={()=>{goto("local")}}>Local Game</button>
<button on:click={newRoom}>New Room</button>

<button disabled={!roomCode} on:click={()=>{goto("game/" + roomCode)}}>Join Room</button>
<input type="text" placeholder="Room Code" bind:value={roomCode}>
<input id="staked" type="checkbox" bind:checked={staked}>
<label for="staked">Staked</label>