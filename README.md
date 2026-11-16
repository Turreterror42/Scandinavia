# Scandinavia — Ars metrica

Practise the rhythm of classical Latin poetry by identifying short and long syllables. Choose an excerpt, mark its syllables, and check your scansion.

## Features

- **Three difficulty levels** with seven Latin excerpts.
- **English and French interface**; the original Latin texts remain unchanged.
- **Instant corrections and scoring** — earn 10 points for each correct syllable.
- **Metrical guidance** with foot divisions and notes on difficult passages.
- **Classical quotations** in their original Greek or Latin, with English or French translations on the welcome and completion screens.
- **Keyboard support:** use `B` for short (*brevis*) and `L` for long (*longa*).
- **Mobile-friendly** layout for phones, tablets, and computers.

## How to play

1. Choose a level, or leave **All levels** selected.
2. Press **Begin practice**.
3. Select a syllable to mark it short (⏑); select it again to mark it long (—).
4. Press **Check answers** to see the corrections, score, and any note for the excerpt.
5. Move on to the next excerpt and complete the set.

## Add a new scansion

Open `data/excerpts.js` and add a new object inside `window.LATIN_EXCERPTS`, separating it from the previous entry with a comma. Keep the syllables in metrical reading order:

```js
{
  id: "my-new-excerpt", // unique ID
  level: 1,              // 1, 2, or 3
  text: "Arma virumque cano",
  source: "Book I · line 1",
  meter: "Dactylic hexameter",
  note: {
    en: "A short explanation in English.",
    fr: "Une courte explication en français."
  },
  syllables: [
    { text: "Ar", quantity: "long", foot: 1 },
    { text: "ma", quantity: "short", foot: 1 },
    { text: "vi", quantity: "short", foot: 1 }
  ]
}
```

Use `quantity: "long"` or `quantity: "short"` for each syllable, and number the `foot` values to show metrical divisions. Add `caesuraAfter: true` to a syllable when a caesura should be marked. For elision, leave the elided syllable out of the tiles and explain it in the note. Make sure the scansion is checked before adding it.

No account or installation is required. Open `index.html` in a modern browser to begin.
