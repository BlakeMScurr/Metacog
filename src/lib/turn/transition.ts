import { nouns } from "../nouns";
import { adjectives } from "../adjectives";
import { doneTurn, drawTurn, guessTurn, selectTurn } from "./turn";
import type { turn } from "./turn";
import { treasury } from "./treasury";
import { assertValidCardPair } from "./assertions";
function drawToSelect(last: turn, current: turn) {
    if (!last.treasury.equals(current.treasury)) throw new Error(`The treasury can't change between draw and select`)
    let draw = <drawTurn>last
    draw.assertValid()
    let select = <selectTurn>current
    select.assertValid()
}

function selectToGuess(last: turn, current: turn):boolean {
    return true
}

function guessToDraw(last: turn, current: turn):boolean {
    return true
}

function guessToDone(last: turn, current: turn):boolean {
    return true
}

let transitions: Map<string, Map<string, (last: turn, current: turn) => boolean>> = new Map(
    [
        ["draw", new Map([
            ["select", drawToSelect],
        ])],
        ["select", new Map([
            ["guess", selectToGuess],
        ])],
        ["guess", new Map([
            ["draw", guessToDraw],
            ["done", guessToDone],
        ])],
    ]
)

export function assertValidTransition(last: turn, current: turn) {
    if (!transitions.has(last.kind())) throw new Error(`turn kind ${last.kind()} doesn't exist`)
    if (!transitions.get(last.kind()).get(current.kind())) throw new Error(`turn kind ${last.kind()} can't be followed by turn kind ${current.kind()}`)
    transitions.get(last.kind()).get(current.kind())(last, current)
}

export function randomWordSelect(turnNumber: number):drawTurn {
    let fixedL = nouns.length
    let optsL = adjectives.length
    let options: [number, number, number] = [0,0,0];
    let fixed: [number, number] = [0,0];
    while (options.length != new Set(options).size) {
        options = [Math.floor(Math.random() * optsL), Math.floor(Math.random() * optsL), Math.floor(Math.random() * optsL)]
    }
    while (fixed.length != new Set(fixed).size) {
        fixed = [Math.floor(Math.random() * fixedL), Math.floor(Math.random() * fixedL)]
    }
    
    return new drawTurn(turnNumber, new treasury(), fixed, options)
}
