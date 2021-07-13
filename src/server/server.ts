// TODO: I should probably put this on a class or something, rather than holding the rooms as a module level variable.

import { assertValidTransition } from "$lib/turn/assertions/transition";
import { nullTurn, turn } from "$lib/turn/turn";

// It feels gross and overly permissive to be encapsulated like this, and there's surely the chance of a race condition.
let rooms: Map<string,  turn> = new Map();

export function getRoomState(room: string):turn {
    if (!rooms.has(room)) {
        return new nullTurn()
    }
    return rooms.get(room)
}

export function updateRoomState(room: string, t: turn) {
    assertValidTransition(getRoomState(room), t)
    rooms.set(room, t)
}