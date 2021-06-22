import { validTransition } from "./transition"
import { treasury } from "./treasury"
import { doneTurn, drawTurn, guessTurn, selectTurn } from "./turn"

// Tests that the graph of the state machine is valid, i.e., that only the right kinds of states can follow one another
test("graph", () => {
    // valid transitions
    expect(validTransition(defaultDrawTurn(), defaultSelectTurn())).toBe(true)
    expect(validTransition(defaultSelectTurn(), defaultGuessTurn())).toBe(true)
    expect(validTransition(defaultGuessTurn(), defaultDrawTurn())).toBe(true)
    expect(validTransition(defaultGuessTurn(), defaultDoneTurn())).toBe(true)
    
    // invalid draw transitions
    expect(validTransition(defaultDrawTurn(), defaultDrawTurn())).toBe(false)
    expect(validTransition(defaultDrawTurn(), defaultGuessTurn())).toBe(false)
    expect(validTransition(defaultDrawTurn(), defaultDoneTurn())).toBe(false)
    
    // invalid select transitions
    expect(validTransition(defaultSelectTurn(), defaultDrawTurn())).toBe(false)
    expect(validTransition(defaultSelectTurn(), defaultSelectTurn())).toBe(false)
    expect(validTransition(defaultSelectTurn(), defaultDoneTurn())).toBe(false)
    
    // invalid guess transitions
    expect(validTransition(defaultGuessTurn(), defaultGuessTurn())).toBe(false)
    expect(validTransition(defaultGuessTurn(), defaultSelectTurn())).toBe(false)

    // invalid done transitions
    expect(validTransition(defaultDoneTurn(), defaultDrawTurn())).toBe(false)
    expect(validTransition(defaultDoneTurn(), defaultSelectTurn())).toBe(false)
    expect(validTransition(defaultDoneTurn(), defaultGuessTurn())).toBe(false)
    expect(validTransition(defaultDoneTurn(), defaultDoneTurn())).toBe(false)
})


function defaultDrawTurn() {
    return new drawTurn(
        0,
        new treasury(),
        [0, 1],
        [0, 1, 2]
    )
}

function defaultSelectTurn() {
    return new selectTurn(
        0,
        new treasury(),
        [0, 1],
        [0, 1],
        [0, 1, 2]
    )
}

function defaultGuessTurn() {
    return new guessTurn(
        0,
        new treasury(),
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1, 2]
    )
}

function defaultDoneTurn() {
    return new doneTurn(
        new treasury()
    )
}