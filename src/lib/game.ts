const startingCoins = 10;
// The game class represents an instance of a MetaCog game
// 
// Setup:
// MetaCog has two players, A and B.
// A and B each put 5 tokens into the pot at the start of the game.
//
// Round:
// A and B take turns at being the selector and the guesser.
// 2 fixed words and 3 optional words are selected at random from a large dictionary every round.
// The selector pairs each fixed word to one optional word, leaving one option unselected.
// Then the guesser tries to figure out the pairs the selector has chosen.
// 
// Scoring:
// If the guesser and selector agree on the pairings they both get a coin.
// If the guesser only gets one pairing right the selector gets two coins.
// If they disagree on both pairings they've bungled the round and two coins are burned forever.
export class Game {
    private state: state;
    private coinsInPot: number;
    private coinsInPileB: number;
    private coinsInPileA: number;

    private playerNames: [string, string];
    private lastPair: wordPair;
    private lastRoundResult: roundResult;
    
    constructor(playerNames: [string, string]) {
        this.state = state.ASelect;
        this.coinsInPot = startingCoins;
        this.coinsInPileA = 0;
        this.coinsInPileB = 0;
        this.lastPair = null;
        this.playerNames = playerNames;
    }
    
    play(pair: wordPair):string {
        let result
        switch(this.state) {
            case state.ASelect:
                this.lastPair = pair
                this.state = state.BGuess
                return ""
            case state.BSelect:
                this.lastPair = pair
                this.state = state.AGuess
                return ""
            case state.AGuess:
                result = this.interpret(pair, this.lastPair)
                this.coinsInPot -= 2
                if (result === roundResult.agreement) {
                    this.coinsInPileA++
                    this.coinsInPileB++
                }
                if (result === roundResult.bamboozle) {
                    this.coinsInPileB++
                }
                if (this.coinsInPot === 0) {
                    this.state = state.Complete
                } else {
                    this.state = state.ASelect
                }
                return this.roundOutcome(result, true)
            case state.BGuess:
                result = this.interpret(pair, this.lastPair)
                this.coinsInPot -= 2
                if (result === roundResult.agreement) {
                    this.coinsInPileA++
                    this.coinsInPileB++
                }
                if (result === roundResult.bamboozle) {
                    this.coinsInPileA++
                }
                if (this.coinsInPot === 0) {
                    this.state = state.Complete
                } else {
                    this.state = state.BSelect
                }
                return this.roundOutcome(result, false)
            case state.Complete:
                throw new Error("you can play a game that's already completed")
        }
    }

    roundOutcome(result: roundResult, aIsSelector: boolean):string {
        switch(result) {
            case roundResult.agreement:
                return "Both players agreed on the pairings and therefore they split the coins"
            case roundResult.bungle:
                return "The players weren't able to agree on either pairing, therefore the coins are burned"
            case roundResult.bamboozle:
                let players = this.playerNames.slice()
                if (!aIsSelector) {
                    let tmp = players[0]
                    players[0] = players[1]
                    players[1] = tmp
                }
                return `${players[0]} bamboozled ${players[1]} into only agreeing on one pair, therefore ${players[0]} gets both coins`
        }
    }

    getState():string {
        switch (this.state) {
            case state.ASelect:
                return `${this.playerNames[0]}'s turn to select`
            case state.BSelect:
                return `${this.playerNames[1]}'s turn to select`
            case state.AGuess:
                return `${this.playerNames[0]}'s turn to guess`
            case state.BGuess:
                return `${this.playerNames[1]}'s turn to guess`
            case state.Complete:
                return `game over man`
        }
    }

    balances():{a: number, b: number, pot: number, burned: number} {
        return {
            a: this.coinsInPileA,
            b: this.coinsInPileB,
            pot: this.coinsInPot,
            burned: startingCoins - this.coinsInPot - this.coinsInPileA - this.coinsInPileB,
        }
    }

    balanceString():string {
        let balances = this.balances()
        return `${this.playerNames[0]}: ${balances.a}
${this.playerNames[1]}: ${balances.b}
pot: ${balances.pot}
burned: ${balances.burned}`
    }

    // interpret determines what kind of a result one gets from a round based on the pairings provided
    private interpret(selection: wordPair, guess: wordPair):roundResult {
        console.log(selection, guess)
        if (selection[0] === guess[0] && selection[1] === guess[1]) return roundResult.agreement;
        if (selection[0] !== guess[0] && selection[1] !== guess[1]) return roundResult.bungle;
        return roundResult.bungle;
    }
}

enum roundResult {
    agreement = 1, // if the players submit the same pairings we say they have reached agreement
    bamboozle, // if the guess only guesses one pairing we say the selector has bamboozled the guesser
    bungle, // if the players don't have any shared pairings we say they have bungled the round
}

export class wordPair {
    indices: [number, number];
    constructor(indices: [number, number]) {
        if (indices[0] === indices[1]) throw new Error("indices must be different")
        let zeroToTwo = [...Array(3).keys()]
        if (!zeroToTwo.includes(indices[0])) throw new Error(`first pairing has invalid index ${indices[0]}`)
        if (!zeroToTwo.includes(indices[1])) throw new Error(`second pairing has invalid index ${indices[1]}`)
        this.indices = indices
    }
}

enum state {
    ASelect = 1,
    BSelect,
    AGuess,
    BGuess,
    Complete,
}