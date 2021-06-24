<h1>About</h1>

<h2>Nobotic</h2>

<p>
    Nobotic is a collection of bot resistant on-chain player vs player games. Its purpose is to further state channel technology, which I believe will be critical in decentralising high throughput nexuses of power (such as social media, search, SaaS etc).
</p>
<p>
    Randomised games exist on blockchains such as CryptoKitties, FairSpin(?), HorseRacing(?), but no skill games aren't that fun. On the other hand, naive on-chain chess would let AIs easily win money from human players since, games of pure calculation advantage algorithms (see AlphaZero).
</p>
<p>
    Humans may have an advantage in metacognitive games. Consider Family Feud, or Dixit, where the object is to guess what other people thought of some information. In Family Feud one must consider what a broad population answered to a prompt, in Dixit one must consider which abstract art best represents a given phrase according to 2-5 other players.
</p>
<p>
    Dixit's incentives are nicely aligned so that all players present some art that best represents a phrase, with the caveat that the phrase chooser doesn't want to be too obvious. However, if a plurality of players has back channel communication they can easily collude to win the game, or at least have an expected value significantly greater than 1.
</p>
<p>
    In crypto land there is no reliable way to prevent a sybil attack, (in fact, part of Bitcoin's original innoviation was in making sybil attacks irrelevant using proof of work). For the same reason, Nobitic games are always two player. Of course one could impersonate another player, but they'd be cheating themselves.
</p>
<p>
    Metacognitive games require some cooperation between players, which is impossible in two player zero sum games since one player's gain is the other player's corresponding loss. If anyone can figure out a positive sum two player game let me know, until then, a negative sum game will have to suffice.
</p>

<h2>MyWord</h2>

<p>    
    MyWord is Nobotic's first game. It is a negative sum word pairing game.
</p>
<p>
    In each round there are 5 randomly selected words, two "fixed" words and two "options". In each round one player is the selector, and selects a pairing between each of the fixed words and one of the options (no repetition is allowed). Then the guesser guesses which pairing the selector chose. If they guess both pairs we say the players "agreed" on the pairings, and they split the round's reward, if they gues just one pair we say the selector "bamboozled" the guesser so the selector gets the whole reward, and if they don't agree on either pairing the reward is burned.
</p>
<p>
    Consider the incentives for a single round. The guesser earns nothing from a bamboozle or bungle, so his only incentive is to accurately guess both of the selector's pairings. The selector earns nothing from a bungle, the whole reward from a bamboozle, and half the reward from an agreement, and they are largely incentivised to choose guessable pairings. See a <a href="analysis">game theoretic analysis</a> showing this more rigorously.
</p>
<p>
    The skill in MyWord is in figuring out the schelling point pairings. GPT3 seems likely to be able to solve this at least as well as humans, so the next Nobotics games will likely use a more abtract and human mechanism than word associations, such as art/music analysis, or more semantically complex word games.
</p>
