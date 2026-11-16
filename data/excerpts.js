/*
 * LATIN EXCERPTS — editable content configuration
 *
 * quantity: "long" or "short" (metrical quantity, not merely vowel length)
 * foot: numbered metrical foot; use caesuraAfter: true for the main pentameter break
 *
 * Scansion references used for checking patterns: the Latin metre guide at
 * https://didaskalia.app/learn/latin/metre/ and the CLTK Latin prosody
 * documentation at https://v1.cltk.org/en/latest/cltk.prosody.lat.html.
 * The hexameter patterns for lines 10–11 were also cross-checked against a
 * grammatical appendix for the poem.
 *
 * Add new excerpts by copying an object. Keep the syllable list in metrical reading order.
 * For elision, omit elided syllables from the tiles and explain the elision in note.en / note.fr.
 */
window.LATIN_EXCERPTS = [
  {
    id: "arma-virumque-cano",
    level: 1,
    text: "Arma virumque cano",
    source: "Book I · line 1 · fragment",
    meter: "Dactylic hexameter · fragment",
    note: {
      en: "A short opening fragment. The first syllable is long by position; the final syllable shown belongs to the next metrical foot in the complete verse.",
      fr: "Un court fragment initial. La première syllabe est longue par position ; la dernière syllabe affichée appartient au pied métrique suivant dans le vers complet."
    },
    syllables: [
      { text: "Ar", quantity: "long", foot: 1 },
      { text: "ma", quantity: "short", foot: 1 },
      { text: "vi", quantity: "short", foot: 1 },
      { text: "rum", quantity: "long", foot: 2 },
      { text: "que", quantity: "short", foot: 2 },
      { text: "ca", quantity: "short", foot: 2 },
      { text: "no", quantity: "long", foot: 3 }
    ]
  },
  {
    id: "fato-profugus",
    level: 1,
    text: "Fato profugus",
    source: "Book I · line 2 · fragment",
    meter: "Dactylic hexameter · fragment",
    note: {
      en: "A fragment taken from the second verse. The two syllables of fato are long by nature; pro- and fu- are short.",
      fr: "Un fragment tiré du deuxième vers. Les deux syllabes de fato sont longues par nature ; pro- et fu- sont brèves."
    },
    syllables: [
      { text: "Fa", quantity: "long", foot: 2 },
      { text: "to", quantity: "long", foot: 3 },
      { text: "pro", quantity: "short", foot: 3 },
      { text: "fu", quantity: "short", foot: 3 },
      { text: "gus", quantity: "long", foot: 4 }
    ]
  },
  {
    id: "insignem-pietate",
    level: 2,
    text: "Insignem pietate virum, tot adire labores",
    source: "Book I · line 10",
    meter: "Dactylic hexameter",
    note: {
      en: "Notice the difference between vowel length and syllable weight: several short vowels occur in closed syllables and therefore scan long by position.",
      fr: "Attention à la différence entre longueur de voyelle et poids syllabique : plusieurs voyelles brèves se trouvent dans des syllabes fermées, donc longues par position."
    },
    syllables: [
      { text: "in", quantity: "long", foot: 1 },
      { text: "sig", quantity: "long", foot: 1 },
      { text: "nem", quantity: "long", foot: 2 },
      { text: "pi", quantity: "short", foot: 2 },
      { text: "e", quantity: "short", foot: 2 },
      { text: "ta", quantity: "long", foot: 3 },
      { text: "te", quantity: "short", foot: 3 },
      { text: "vi", quantity: "short", foot: 3 },
      { text: "rum", quantity: "long", foot: 4 },
      { text: "to", quantity: "short", foot: 4 },
      { text: "ta", quantity: "short", foot: 4 },
      { text: "di", quantity: "long", foot: 5 },
      { text: "re", quantity: "short", foot: 5 },
      { text: "la", quantity: "short", foot: 5 },
      { text: "bo", quantity: "long", foot: 6 },
      { text: "res", quantity: "long", foot: 6, anceps: true }
    ]
  },
  {
    id: "litora-multum-ille",
    level: 3,
    text: "Litora, multum ille et terris iactatus et alto",
    source: "Book I · line 3",
    meter: "Dactylic hexameter · two elisions",
    note: {
      en: "Two elisions: the final -um of multum disappears before ille, and the final -e of ille disappears before et. The tiles show the metrical reading after elision.",
      fr: "Deux élisions : le -um final de multum disparaît devant ille, puis le -e final de ille disparaît devant et. Les cases montrent la lecture métrique après élision."
    },
    syllables: [
      { text: "Li", quantity: "long", foot: 1 },
      { text: "to", quantity: "short", foot: 1 },
      { text: "ra", quantity: "short", foot: 1 },
      { text: "mul", quantity: "long", foot: 2 },
      { text: "til", quantity: "long", foot: 2 },
      { text: "let", quantity: "long", foot: 3 },
      { text: "ter", quantity: "long", foot: 3 },
      { text: "ris", quantity: "long", foot: 4 },
      { text: "iac", quantity: "long", foot: 4 },
      { text: "ta", quantity: "long", foot: 5 },
      { text: "tus", quantity: "short", foot: 5 },
      { text: "et", quantity: "short", foot: 5 },
      { text: "al", quantity: "long", foot: 6 },
      { text: "to", quantity: "long", foot: 6, anceps: true }
    ]
  },
  {
    id: "odi-et-amo",
    level: 3,
    text: "Odi et amo. Quare id faciam, fortasse requiris",
    source: "Poem 85 · line 1",
    meter: "Dactylic hexameter · two elisions",
    note: {
      en: "Two elisions: the -i of odi disappears before et, and the -e of quare disappears before id. The final syllable is anceps.",
      fr: "Deux élisions : le -i de odi disparaît devant et, puis le -e de quare disparaît devant id. La dernière syllabe est anceps."
    },
    syllables: [
      { text: "O", quantity: "long", foot: 1 },
      { text: "det", quantity: "short", foot: 1 },
      { text: "a", quantity: "short", foot: 1 },
      { text: "mo", quantity: "long", foot: 2 },
      { text: "qua", quantity: "long", foot: 2 },
      { text: "rid", quantity: "long", foot: 3 },
      { text: "fa", quantity: "short", foot: 3 },
      { text: "ci", quantity: "short", foot: 3 },
      { text: "am", quantity: "long", foot: 4 },
      { text: "for", quantity: "long", foot: 4 },
      { text: "tas", quantity: "long", foot: 5 },
      { text: "se", quantity: "short", foot: 5 },
      { text: "re", quantity: "short", foot: 5 },
      { text: "qui", quantity: "long", foot: 6 },
      { text: "ris", quantity: "long", foot: 6, anceps: true }
    ]
  },
  {
    id: "nescio-sed-fieri",
    level: 3,
    text: "Nescio, sed fieri sentio et excrucior",
    source: "Poem 85 · line 2",
    meter: "Elegiac pentameter · elision and caesura",
    note: {
      en: "The final -o of sentio is elided before et. The strong pause (diaeresis) follows rī, dividing the pentameter into two balanced halves.",
      fr: "Le -o final de sentio est élidé devant et. La coupe principale (diérèse) suit rī et partage le pentamètre en deux moitiés équilibrées."
    },
    syllables: [
      { text: "nes", quantity: "long", foot: 1 },
      { text: "ci", quantity: "short", foot: 1 },
      { text: "o", quantity: "short", foot: 1 },
      { text: "sed", quantity: "long", foot: 2 },
      { text: "fi", quantity: "short", foot: 2 },
      { text: "e", quantity: "short", foot: 2 },
      { text: "ri", quantity: "long", foot: 3, caesuraAfter: true },
      { text: "sen", quantity: "long", foot: 4 },
      { text: "ti", quantity: "short", foot: 4 },
      { text: "et", quantity: "short", foot: 4 },
      { text: "ex", quantity: "long", foot: 5 },
      { text: "cru", quantity: "short", foot: 5 },
      { text: "ci", quantity: "short", foot: 5 },
      { text: "or", quantity: "long", foot: 6, anceps: true }
    ]
  },
  {
    id: "impulerit-tantaene",
    level: 3,
    text: "Impulerit. Tantaene animis caelestibus irae?",
    source: "Book I · line 11",
    meter: "Dactylic hexameter",
    note: {
      en: "The -e of Tantaene is elided before animis. The final syllable is anceps and is treated as long here; a syllable marked long by position does not make its vowel naturally long.",
      fr: "Le -e de Tantaene est élidé devant animis. La dernière syllabe est anceps et est traitée comme longue ici ; une syllabe longue par position ne transforme pas sa voyelle en voyelle longue par nature."
    },
    syllables: [
      { text: "im", quantity: "long", foot: 1 },
      { text: "pu", quantity: "short", foot: 1 },
      { text: "le", quantity: "short", foot: 1 },
      { text: "rit", quantity: "long", foot: 2 },
      { text: "Tan", quantity: "long", foot: 2 },
      { text: "taen", quantity: "long", foot: 3 },
      { text: "a", quantity: "short", foot: 3 },
      { text: "ni", quantity: "short", foot: 3 },
      { text: "mis", quantity: "long", foot: 4 },
      { text: "cae", quantity: "long", foot: 4 },
      { text: "les", quantity: "long", foot: 5 },
      { text: "ti", quantity: "short", foot: 5 },
      { text: "bus", quantity: "short", foot: 5 },
      { text: "i", quantity: "long", foot: 6 },
      { text: "rae", quantity: "long", foot: 6, anceps: true }
    ]
  }
];
