import { nouns } from "../nouns";
import { adjectives } from "../adjectives";
import { assertIndexInRange, assertNaturalNumber, assertNoRepeats, assertValidCardPair } from "./assertions";
import type { treasury } from "./treasury";

export interface turn {
    explain():string
}

// A draw cards turn represents a random selection of a set of words from our two word lists
export class drawCardsTurn implements turn {
    // existing state
    turn: number;
    treasury: treasury;

    // new state
    fixed: [number, number];
    options: [number, number, number];

    constructor(turn: number, treasury: treasury, fixed: [number, number], options: [number, number, number]) {
        // assert that the argumets are valid indices for our wordlists
        assertNoRepeats(fixed)
        assertNoRepeats(options)
        fixed.forEach((i: number) => { assertIndexInRange(i, nouns) })
        options.forEach((i: number) => { assertIndexInRange(i, adjectives) })
        fixed.concat(options).forEach((i: number) => { assertNaturalNumber(i) })

        this.options = options
        this.fixed = fixed
        this.turn = turn
        this.treasury = treasury
    }

    explain():string {
        return `The fixed words randomly chosen for this round were ${this.wordsOf(this.fixed, nouns)} and the options randomly chosen for this round were ${this.wordsOf(this.options, adjectives)}`
    }

    // Util function to find the words represented by indices
    private wordsOf(indices: Array<number>, wordList: Array<string>):string {
        return "[" + indices.map((i) => {return `"${wordList[i]}"`}).join(", ") + "]"
    }
}

export class selectTurn implements turn {
    // existing state
    turn: number;
    treasury: treasury;

    // new state
    pair: [number, number];
    fixed: [number, number];
    options: [number, number, number];    
    

    constructor(turn: number, treasury: treasury, pair: [number, number], fixed: [number, number], options: [number, number, number]) {
        assertValidCardPair(pair)
        this.pair = pair;

        this.turn = turn
        this.treasury = treasury
        this.fixed = fixed;
        this.options = options;
    }

    explain():string {
        return `Player ${1 + (this.turn % 2)} selected (${nouns[0]}, ${adjectives[this.pair[0]]}) and (${nouns[1]}, ${adjectives[this.pair[1]]}) for their word pairings.`
    }
}
