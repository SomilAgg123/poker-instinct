# River Market

An original, playable poker-inspired drafting game built for the public poker experiment.

**Play:** open `index.html` in any modern browser. No installation, build, login, server or network connection is needed. Everything the game needs lives in that single file.

## The idea

Poker hand-building meets an open-information draft. You and a rival build three five-card hands from the same four-card market. You choose first; the rival takes a remaining card; the other cards are discarded. The question is not only "what improves my hand?" but "what am I leaving for the rival?"

Three different contracts pull your hands in different directions. A weak hand with a contract can still contribute to the match. Two limited market refreshes make bad luck manageable, but spending one early leaves less control at the end.

A match lasts 15 picks, usually a few minutes. There is no real money, betting or gambling service.

## Rules

1. Select a market card, then place it in one of your rivers. Placements are permanent. Each river holds five cards.
2. The rival drafts one remaining market card into its own river. Its hands are always visible.
3. The two unchosen cards are discarded and four new cards appear. You may refresh the market twice per match before picking.
4. After 15 picks, compare the poker hand in each matching river. A win scores **3 points**; a tie scores **1 for each side**.
5. A completed contract scores **2 bonus points**, even if its hand loses:
   - **Ember:** at least four red cards, counting hearts and diamonds together.
   - **Current:** a straight or straight flush.
   - **Anchor:** three of a kind, a full house or four of a kind.
6. Highest total wins. Equal totals are a draw.

Normal poker ranks and kickers apply. An ace can be low only in A-2-3-4-5. Suits do not break ties. No jokers. A full match exposes more than 52 cards, so when the draw pile has fewer than four cards, all unplaced cards are reshuffled. Placed cards remain out of the deck. Earlier discards can reappear, but an identical card can never appear twice on the table.

## Rival and replay options

- **Drifter:** noisy choices; a forgiving first opponent.
- **Tactician:** weighs matching ranks, suit and straight potential, and contracts.
- **Shark:** also values denying cards that would help you.
- **Daily challenge:** seeded by UTC date and difficulty. Same options plus same choices produce the same match. It is local and has no leaderboard.
- **Fresh shuffle:** a new random seed each match.

The rival uses only visible information. It does not peek at the deck. You have first pick on every market; difficulty comes from its decision quality, not secret cards or different scoring.

Device-local win statistics are saved if browser storage is available. Gameplay still works when storage is disabled. Matches are not currently saved across reloads.

## Hosting

This is a static site. Upload `index.html` to any static web host. It also works at a subdirectory URL without changes.

For GitHub Pages: in repository **Settings → Pages**, choose **Deploy from a branch**, select **main**, and choose **/(root)**. Save. No build pipeline is required. Hosting is intentionally left to the experiment organizer.

To serve locally instead of opening the file:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Tests

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

## Design decisions and progress

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

## Limitations

The rival is a heuristic player, not a solved optimal strategy. The daily mode is an honest local puzzle, not a secure competitive leaderboard. There is no multiplayer, backend, analytics, payment or remote persistence. Modern Chrome, Safari, Edge or Firefox is recommended.
