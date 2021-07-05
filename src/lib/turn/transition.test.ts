import { assertValidTransition } from "./assertions/transition"
import { treasury } from "./treasury"
import { drawTurn, guessTurn, selectTurn } from "./turn"

// Tests that the graph of the state machine is valid, i.e., that only the right kinds of states can follow one another
test("graph", () => {
    // valid transitions
    expect(()=>{assertValidTransition(defaultDrawTurn(), defaultSelectTurn())}).not.toThrow()
    expect(()=>{assertValidTransition(defaultSelectTurn(), defaultGuessTurn())}).not.toThrow()
    expect(()=>{assertValidTransition(defaultGuessTurn(), nextDrawTurn())}).not.toThrow()

    // invalid draw transitions
    expect(()=>{assertValidTransition(defaultDrawTurn(), defaultDrawTurn())}).toThrow()
    expect(()=>{assertValidTransition(defaultDrawTurn(), defaultGuessTurn())}).toThrow()

    // invalid select transitions
    expect(()=>{assertValidTransition(defaultSelectTurn(), defaultDrawTurn())}).toThrow()
    expect(()=>{assertValidTransition(defaultSelectTurn(), defaultSelectTurn())}).toThrow()

    // invalid guess transitions
    expect(()=>{assertValidTransition(defaultGuessTurn(), defaultGuessTurn())}).toThrow()
    expect(()=>{assertValidTransition(defaultGuessTurn(), defaultSelectTurn())}).toThrow()
})


function defaultDrawTurn() {
    return new drawTurn(
        0,
        new treasury(),
        [0, 1],
        [0, 1, 2]
    )
}
function nextDrawTurn() {
    return new drawTurn(
        3,
        updatedTreasury(),
        [0, 1],
        [0, 1, 2]
    )
}

function defaultSelectTurn() {
    return new selectTurn(
        1,
        new treasury(),
        [0, 1],
        [0, 1],
        [0, 1, 2]
    )
}

function defaultGuessTurn() {
    return new guessTurn(
        2,
        updatedTreasury(),
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1, 2]
    )
}

function updatedTreasury() {
    let t = new treasury()
    t.pot -= 2
    t.a++
    t.b++
    return t
}