import { nouns } from "../nouns";
import { adjectives } from "../adjectives";
import { drawCardsTurn } from "./turn";
import { treasury } from "./treasury";

export function randomWordSelect(turnNumber: number):drawCardsTurn {
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
    
    return new drawCardsTurn(turnNumber, new treasury(), fixed, options)
}
