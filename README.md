<div align="center">

# ♠ ♥ RIVER MARKET ♦ ♣

### *Poker hands. Open cards. One shared market.*

**[▶ PLAY NOW](https://somilagg123.github.io/poker-instinct/)**

![Play](https://img.shields.io/badge/play-in%20browser-2ea44f?style=for-the-badge)
![Picks](https://img.shields.io/badge/match-15%20picks-b31b1b?style=for-the-badge)
![Hands](https://img.shields.io/badge/hands-3%20rivers-1f6feb?style=for-the-badge)
![Deps](https://img.shields.io/badge/dependencies-0-8957e5?style=for-the-badge)
![Money](https://img.shields.io/badge/real%20money-none-lightgrey?style=for-the-badge)

## `[ A♠ ]  [ K♥ ]  [ 10♦ ]  [ 7♣ ]`

*The market. You pick first. The rival takes one. The rest burn.*

</div>

---

## 🃏 The idea

Poker hand-building meets an open-information draft. You and a rival build **three five-card hands** from the same four-card market. You choose first; the rival takes a remaining card; the other cards are discarded.

> The question is not only *"what improves my hand?"* but **"what am I leaving for the rival?"**

Three contracts pull your hands in different directions. Two market refreshes make bad luck manageable, but spending one early leaves less control at the end. A match is 15 picks and takes a few minutes.

## 🎯 Rules at a glance

| Step | What happens |
|---|---|
| 🂡 **Pick** | Select a market card and place it in one of your rivers. Placements are permanent. Each river holds five cards. |
| 🤖 **Rival** | It drafts one remaining card into its own river. Its hands are always visible. |
| 🔥 **Burn** | The two unchosen cards are discarded and four new ones appear. Refresh the market twice per match. |
| 🏁 **Showdown** | After 15 picks, each matching pair of rivers is compared. |
| 🏆 **Score** | Win = **3 pts**. Tie = **1 pt** each. Completed contract = **+2 pts**, even if the hand loses. |

### 📜 Bonus contracts

| | Contract | Needs |
|---|---|---|
| 🔥 | **Ember** | At least four red cards (hearts and diamonds together) |
| 🌊 | **Current** | A straight or straight flush |
| ⚓ | **Anchor** | Three of a kind, a full house or four of a kind |

Highest total wins. Equal totals are a draw. Normal poker ranks and kickers apply. An ace is low only in A-2-3-4-5. Suits never break ties. No jokers. When the draw pile has fewer than four cards, all unplaced cards are reshuffled. Placed cards stay out, and an identical card never appears twice on the table.

## 🦈 Rivals

| Rival | Style |
|---|---|
| 🐟 **Drifter** | Noisy choices. A forgiving first opponent. |
| 🧠 **Tactician** | Weighs matching ranks, suit and straight potential, and contracts. |
| 🦈 **Shark** | Also values denying cards that would help you. |

- 📅 **Daily challenge:** seeded by UTC date and difficulty. Same options plus same choices give the same match. Local only, no leaderboard.
- 🎲 **Fresh shuffle:** a new random seed every match.

The rival sees only what you see. It does not peek at the deck, and you pick first on every market. Difficulty comes from decision quality, not secret cards or different scoring. Win statistics are saved on your device if browser storage is available.

## ✨ Why it's fun

- 👀 **Everything is visible.** All six hands are open, so denial picks are real strategy.
- ⚖️ **Weak hands still matter.** A contract can rescue a losing river.
- ⏳ **Refreshes are a trade.** Better cards now, less control later.
- 📦 **One file.** No install, no build, no login, no network.

---

## 🚀 Hosting

This is a static site. Upload `index.html` to any static web host. It also works at a subdirectory URL without changes.

For GitHub Pages: in repository **Settings → Pages**, choose **Deploy from a branch**, select **main**, and choose **/(root)**. Save. No build pipeline is required.

To serve locally instead of opening the file:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 🧪 Tests

Node is needed only to run the developer tests, not to play:

```sh
node tests/engine.test.cjs
```

The zero-dependency suite extracts the actual shipped engine from `index.html`. It checks all **2,598,960** five-card poker combinations against known category totals, ace-low handling, tie-breaks, contracts, duplicate-card protection and **1,500** complete seeded matches across the rival difficulties.

Optional browser checks (requires the developer-only Playwright package and its Chromium browser):

```sh
npm install --no-save playwright
npx playwright install chromium
node tests/browser.test.cjs
```

To use an existing Chrome binary instead, set `CHROME_PATH`. Screenshots are written to `/tmp`. No installed packages are used by the delivered game.

Browser verification covers: a full 15-pick match, score display, rules, fresh-game controls, refresh limits, daily repeatability, keyboard operation and layouts at 320, 390 and 1280px. No external fonts, images, scripts or libraries are loaded by the game.

## 🛠 Design decisions and progress

### First playable version

- Chose drafting rather than conventional betting to create a different decision loop and make solo browser play meaningful.
- Made all six hands visible so denial picks can be reasoned about.
- Added different bonus contracts to avoid building three identical kinds of hand.
- Kept the evaluator separate from the UI inside the self-contained file so it can be tested directly.
- Added difficulty choices and deterministic daily deals for replay.
- Used a quiet, high-contrast card table, real suit glyphs, responsive card layouts, keyboard-native controls and reduced-motion support. No downloaded assets or asset licenses are required.

### Verification iteration

- Replaced an early deck-replenishment approach with a reshuffle of only unplaced cards. This prevents duplicate physical cards anywhere on the table and keeps normal poker rules intact.
- Exhaustively checked all poker hand categories and simulated 1,500 games.
- Checked phone and desktop layouts and a complete match in Chrome.
- Changed rival hands to readable stacked rows on narrow phones, keeping the visible-information strategy usable at 320px.

## ⚠️ Limitations

The rival is a heuristic player, not a solved optimal strategy. The daily mode is an honest local puzzle, not a secure competitive leaderboard. There is no multiplayer, backend, analytics, payment or remote persistence. Modern Chrome, Safari, Edge or Firefox is recommended.
