<script lang="ts">
    import { goto } from "$app/navigation"

    let roomCode = ""

    function newRoom() {
        fetch("/api/makeRoom")
            .then(response => {
                return response.json()
            }).then(data => {
                console.log("going!")
                goto("game/" + data.roomCode)
            })
    }

</script>

<button on:click={()=>{goto("local")}}>Local Game</button>
<button on:click={newRoom}>New Room</button>
<button disabled={!roomCode} on:click={()=>{goto("game/" + roomCode)}}>Join Room</button>
<input type="text" placeholder="Room Code" bind:value={roomCode}>