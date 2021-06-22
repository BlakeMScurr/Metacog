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
}