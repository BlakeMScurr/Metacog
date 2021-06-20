import * as nouns from "../lib/nouns";
import * as adjectives from "../lib/adjectives";

export interface turn {
    explain():string
}

export function randomWordSelect():wordSelectTurn {
    let optsL = nouns.default.length
    let fixedL = adjectives.default.length
    let options: [number, number, number] = [Math.floor(Math.random() * optsL), Math.floor(Math.random() * optsL), Math.floor(Math.random() * optsL)]
    let fixed: [number, number] = [Math.floor(Math.random() * fixedL), Math.floor(Math.random() * fixedL)]
    return new wordSelectTurn(fixed, options)
}

export class wordSelectTurn implements turn {
    fixed: [number, number];
    options: [number, number, number];

    constructor(fixed: [number, number], options: [number, number, number]) {
        if (fixed[0] === fixed[1]) throw new Error(`repeated fixed ${fixed[0]}`)
        if (options[0] === options[1] || options[0] === options[2]) throw new Error(`repeated option ${options[0]}`)
        if (options[1] === options[2]) throw new Error(`repeated option ${options[1]}`)
        fixed.concat(options).forEach((index: number) => {
            if (Math.floor(index) != index) throw new Error (`non integer index ${index}`)
            if (index < 0) throw new Error(`negative index ${index}`)
        })

        this.options = options
        this.fixed = fixed
    }

    explain():string {
        return `The fixed words randomly chosen for this round were "${wordsOf(this.fixed, nouns.default)}" and the options randomly chosen for this round were "${wordsOf(this.options, adjectives.default)}"`
    }
}

// Util function to find the words represented by indices
function wordsOf(indices: Array<number>, wordList: Array<string>):Array<string> {
    return indices.map((i) => {return wordList[i]})
}

