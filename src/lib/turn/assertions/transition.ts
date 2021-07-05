import type {  drawTurn, guessTurn, selectTurn } from "../turn";
import type { turn } from "../turn";
import { arraysEqual } from "../../util";

function drawToSelect(last: turn, current: turn) {
    let draw = <drawTurn>last
    let select = <selectTurn>current
    
    // assert shared state hasn't updated
    if (!last.treasury.equals(current.treasury)) throw new Error(`The treasury can't change between draw and select`)
    if (!arraysEqual(draw.fixed, select.fixed)) throw new Error(`Fixed words can't change between draw and select turn`)
    if (!arraysEqual(draw.options, select.options)) throw new Error(`Optional words can't change between draw and select turn`)
}

function selectToGuess(last: turn, current: turn) {
    let select = <selectTurn>last
    let guess = <guessTurn>current

    // assert selection hasn't been maliciously updated
    if (!arraysEqual(select.selection, guess.selection)) throw new Error(`Selection can't be updated between selection and guess rounds`)

    // assert card choice hasn't been updated
    if (!arraysEqual(select.fixed, guess.fixed)) throw new Error(`Fixed words can't change between select and guess turn`)
    if (!arraysEqual(select.options, guess.options)) throw new Error(`Optional words can't change between select and guess turn`)

    // assert treasury updates correctly
    last.treasury.validRoundAllocation(current.treasury, guess.selection, guess.guess, select.turn % 2 == 0)
}

function guessToDraw(last: turn, current: turn) {
    if (current.treasury.pot < 2) throw new Error(`Can't start a new round with less than 2 coins in the pot`)
    if (!last.treasury.equals(current.treasury)) throw new Error(`The treasury can't change between guess and draw`)
}

let transitions: Map<string, Map<string, (last: turn, current: turn) => void>> = new Map(
    [
        ["draw", new Map([
            ["select", drawToSelect],
        ])],
        ["select", new Map([
            ["guess", selectToGuess],
        ])],
        ["guess", new Map([
            ["draw", guessToDraw],
        ])],
    ]
)

export function assertValidTransition(last: turn, current: turn) {
    if (last.turn + 1 !== current.turn) throw new Error(`Turns must increment by 1. Last turn was ${last.turn}, current turn is ${current.turn}`)
    last.assertValid()
    current.assertValid()

    if (!transitions.has(last.kind)) throw new Error(`turn kind ${last.kind} doesn't exist`)
    if (!transitions.get(last.kind).get(current.kind)) throw new Error(`turn kind ${last.kind} can't be followed by turn kind ${current.kind}`)
    transitions.get(last.kind).get(current.kind)(last, current)
}