// TODO: I should probably put this on a class or something, rather than holding the rooms as a module level variable.
// It feels gross and overly permissive to be encapsulated like this, and there's surely the chance of a race condition.
let rooms: Map<string, roomState> = new Map();

export enum roomState {
    empty = 1,
    waiting,
    full,
}

export function joinRoom(room: string):roomState {
    if (!rooms.has(room)) return roomState.full
    let oldState = rooms.get(room)
    switch (oldState) {
        case roomState.empty:
            rooms.set(room, roomState.waiting)
            break
        case roomState.waiting:
            rooms.set(room, roomState.full)
            break
        case roomState.full:
            break
    }

    return oldState
}

// from https://stackoverflow.com/a/1349426/7371580
export function newRoom():string {
    const length = 4
    let generateID = () => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // TODO: generate nice room names in sequence so that attackers can't fill up our space of possible names (62^4 = 14776336) and have us generate existing room in a loop
    // Ideally, in fact, this server wouldn't even store anything, it would just act as an adjudicator
    let id = generateID();
    while (rooms.has(id)) {
        id = generateID()
    }
    rooms.set(id, roomState.empty)
    return id
}