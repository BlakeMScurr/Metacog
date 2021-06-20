import { nouns } from "../nouns";
import { adjectives } from "../adjectives";
import { assertIndexInRange, assertNaturalNumber, assertNoRepeats } from "./assertions";

export interface turn {
    explain():string
}

export function randomWordSelect():wordSelectTurn {
    let optsL = nouns.length
    let fixedL = adjectives.length
    let options: [number, number, number] = [Math.floor(Math.random() * optsL), Math.floor(Math.random() * optsL), Math.floor(Math.random() * optsL)]
    let fixed: [number, number] = [Math.floor(Math.random() * fixedL), Math.floor(Math.random() * fixedL)]
    return new wordSelectTurn(fixed, options)
}

export class wordSelectTurn implements turn {
    fixed: [number, number];
    options: [number, number, number];

    constructor(fixed: [number, number], options: [number, number, number]) {
        // assert that the argumets are valid indices for our wordlists
        assertNoRepeats(fixed)
        assertNoRepeats(options)
        fixed.forEach((i: number) => { assertIndexInRange(i, nouns) })
        options.forEach((i: number) => { assertIndexInRange(i, adjectives) })
        fixed.concat(options).forEach((i: number) => { assertNaturalNumber(i) })

        this.options = options
        this.fixed = fixed
    }

    explain():string {
        return `The fixed words randomly chosen for this round were ${this.wordsOf(this.fixed, nouns)} and the options randomly chosen for this round were ${this.wordsOf(this.options, adjectives)}`
    }

    // Util function to find the words represented by indices
    private wordsOf(indices: Array<number>, wordList: Array<string>):string {
        return "[" + indices.map((i) => {return `"${wordList[i]}"`}).join(", ") + "]"
    }
}



