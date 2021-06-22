import { nouns } from "../nouns";
import { adjectives } from "../adjectives";
import { doneTurn, drawTurn, guessTurn, selectTurn } from "./turn";
import type { turn } from "./turn";
import { treasury } from "./treasury";

function drawToSelect(last: turn, current: turn):boolean {
    return true
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

export function validTransition(last: turn, current: turn):boolean {
    if (!transitions.has(last.kind()) || !transitions.get(last.kind()).get(current.kind())) return false
    return transitions.get(last.kind()).get(current.kind())(last, current)
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
