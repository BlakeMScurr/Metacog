
export class seat {
    jwt: string
    playerA: boolean
    room: string

    constructor(jwt: string, playerA: boolean, room: string) {
        this.jwt = jwt
        this.playerA = playerA
        this.room = room
    }
}
