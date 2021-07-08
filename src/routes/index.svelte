<script lang="ts">
    import { goto } from "$app/navigation"

    let roomCode = ""
</script>

<button on:click={()=>{goto("local")}}>Local Game</button>
<button on:click={()=>{goto("challenge")}}>New Room</button>

<button disabled={!roomCode} on:click={()=>{goto("game/" + roomCode)}}>Join Room</button>
<input type="text" placeholder="Room Code" bind:value={roomCode}>