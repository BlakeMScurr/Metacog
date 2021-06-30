export const startingPot = 12;
export class treasury {
    pot: number;
    a: number;
    b: number;

    constructor() {
        this.pot = startingPot;
        this.a = 0;
        this.b = 0;
    }

    burned():number {
        return startingPot - this.a - this.b
    }

    equals(t: treasury):boolean {
        return this.pot === t.pot && this.a === t.a && this.b == t.b
    }

    validRoundAllocation(allocation: treasury, selection: [number, number], guess: [number, number], aIsSelector: boolean) {
        if (this.pot -2 != allocation.pot) throw new Error("treasury pot must reduce when each round is decided")
        
        let consensuses = 0
        selection.forEach((selection: number, i: number) => {
            if (selection === guess[i]) consensuses++
        })

        let selectorDelta = 0
        let guesserDelta = 0

        switch(consensuses) {
            // bungle
            case 0:
                break
            // bamboozle
            case 1:
                selectorDelta += 2
                break
            // agreement
            case 2:
                selectorDelta++
                guesserDelta++
                break
            default:
                throw new Error(`dev error: it should only be possible to have 0 to 2 consensuses, got ${consensuses}`)
        }

        if (aIsSelector) {
            if (this.a + selectorDelta != allocation.a) throw new Error(`Player a got ${allocation.a} but they should have gotten ${this.a + selectorDelta}`)
            if (this.b + guesserDelta != allocation.b) throw new Error(`Player a got ${allocation.b} but they should have gotten ${this.b + guesserDelta}`)
        } else {
            if (this.a + guesserDelta != allocation.a) throw new Error(`Player a got ${allocation.a} but they should have gotten ${this.a + guesserDelta}`)
            if (this.b + selectorDelta != allocation.b) throw new Error(`Player a got ${allocation.b} but they should have gotten ${this.b + selectorDelta}`)
        }
    }

}