(() => {
  "use strict";

  const excerpts = Array.isArray(window.LATIN_EXCERPTS) ? window.LATIN_EXCERPTS : [];
  const dictionaries = window.APP_I18N || {};
  const quotes = window.PHILOSOPHICAL_QUOTES || {};
  const elements = {
    languageEn: document.getElementById("lang-en"),
    languageFr: document.getElementById("lang-fr"),
    levelFilter: document.getElementById("level-filter"),
    levelCount: document.getElementById("level-count"),
    progressCount: document.getElementById("progress-count"),
    progressTrack: document.getElementById("progress-track"),
    progressFill: document.getElementById("progress-fill"),
    scoreValue: document.getElementById("score-value"),
    welcome: document.getElementById("welcome-state"),
    exercise: document.getElementById("exercise-state"),
    finish: document.getElementById("finish-state"),
    start: document.getElementById("start-button"),
    validate: document.getElementById("validate-button"),
    next: document.getElementById("next-button"),
    replay: document.getElementById("replay-button"),
    source: document.getElementById("exercise-source"),
    heading: document.getElementById("exercise-heading"),
    levelStamp: document.getElementById("level-stamp"),
    meter: document.getElementById("meter-label"),
    syllables: document.getElementById("syllable-container"),
    interactionNote: document.getElementById("interaction-note"),
    answerLegend: document.getElementById("answer-legend"),
    result: document.getElementById("result-message"),
    note: document.getElementById("editorial-note"),
    finalScore: document.getElementById("final-score"),
    finishCopy: document.getElementById("finish-copy"),
    homeQuoteOriginal: document.getElementById("home-quote-original"),
    homeQuoteTranslation: document.getElementById("home-quote-translation"),
    homeQuoteAuthor: document.getElementById("home-quote-author"),
    homeQuoteSource: document.getElementById("home-quote-source"),
    finishQuoteOriginal: document.getElementById("finish-quote-original"),
    finishQuoteTranslation: document.getElementById("finish-quote-translation"),
    finishQuoteAuthor: document.getElementById("finish-quote-author"),
    finishQuoteSource: document.getElementById("finish-quote-source")
  };

  const state = {
    language: "en",
    pool: [],
    index: 0,
    score: 0,
    validated: false,
    started: false,
    correctCount: 0,
    earnedPoints: 0,
    perfect: false
  };

  function t(key, ...args) {
    const dictionary = dictionaries[state.language] || dictionaries.en || {};
    const value = dictionary[key];
    return typeof value === "function" ? value(...args) : (value ?? key);
  }

  function renderQuote(prefix, quote) {
    if (!quote) return;
    const original = elements[`${prefix}QuoteOriginal`];
    const translation = elements[`${prefix}QuoteTranslation`];
    const author = elements[`${prefix}QuoteAuthor`];
    const source = elements[`${prefix}QuoteSource`];
    if (!original || !translation || !author || !source) return;

    original.textContent = quote.original;
    original.lang = quote.language || "la";
    translation.textContent = quote[state.language] || quote.en || "";
    author.textContent = quote.author?.[state.language] || quote.author?.en || "";
    source.textContent = quote.source?.[state.language] || quote.source?.en || "";
  }

  function setLanguage(language) {
    if (!dictionaries[language]) return;
    state.language = language;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      const translated = t(key);
      if (typeof translated === "string") node.textContent = translated;
    });
    elements.languageEn.classList.toggle("is-active", language === "en");
    elements.languageFr.classList.toggle("is-active", language === "fr");
    elements.languageEn.setAttribute("aria-pressed", String(language === "en"));
    elements.languageFr.setAttribute("aria-pressed", String(language === "fr"));
    document.querySelector(".language-switch").setAttribute("aria-label", t("languageLabel"));
    elements.progressTrack.setAttribute("aria-label", t("progressLabel"));
    elements.syllables.setAttribute("aria-label", t("syllableGroupLabel"));
    updateLevelCount();
    renderQuote("home", quotes.home);
    if (state.started && !elements.finish.hidden) {
      elements.finishCopy.textContent = t("completed", state.pool.length);
      const lastExcerpt = state.pool[state.pool.length - 1];
      renderQuote("finish", quotes.completion?.[lastExcerpt?.level]);
    }
    if (state.started && !elements.exercise.hidden) {
      const item = state.pool[state.index];
      if (item) {
        elements.levelStamp.textContent = t("levelName")[item.level];
        if (state.validated) {
          const total = item.syllables.length;
          elements.result.textContent = state.perfect
            ? `${t("perfect")} ${t("result", state.correctCount, total, state.earnedPoints)}`
            : t("result", state.correctCount, total, state.earnedPoints);
          elements.note.textContent = item.note && item.note[state.language] ? item.note[state.language] : "";
          elements.next.querySelector("span").textContent = state.index === state.pool.length - 1 ? t("nextLast") : t("next");
        }
        elements.syllables.querySelectorAll(".syllable-button").forEach((button) => {
          const selected = button.dataset.choice || "";
          const quantity = state.validated ? button.dataset.correct : selected;
          const stateLabel = state.validated
            ? (selected === button.dataset.correct ? t("correct") : selected ? t("incorrect") : t("notAnswered"))
            : (selected === "long" ? t("longMark") : selected === "short" ? t("shortMark") : t("notAnswered"));
          button.setAttribute("aria-label", t("accessibleSyllable", button.dataset.syllable, state.validated ? `${stateLabel}. ${t(quantity === "long" ? "longMark" : "shortMark")}` : stateLabel));
        });
      }
    }
  }

  function validExcerpt(item) {
    return Boolean(
      item &&
      typeof item.id === "string" &&
      typeof item.text === "string" &&
      typeof item.source === "string" &&
      typeof item.meter === "string" &&
      [1, 2, 3].includes(item.level) &&
      Array.isArray(item.syllables) &&
      item.syllables.length > 0 &&
      item.syllables.every((syllable) =>
        syllable &&
        typeof syllable.text === "string" &&
        syllable.text.length > 0 &&
        ["long", "short"].includes(syllable.quantity) &&
        Number.isInteger(syllable.foot) &&
        syllable.foot > 0
      )
    );
  }

  function getFilteredExcerpts() {
    const selectedLevel = elements.levelFilter.value;
    return excerpts.filter((item) =>
      validExcerpt(item) && (selectedLevel === "all" || String(item.level) === selectedLevel)
    );
  }

  function updateLevelCount() {
    const count = getFilteredExcerpts().length;
    elements.levelCount.textContent = t("count", count);
  }

  function updateProgress() {
    const total = state.pool.length;
    const current = total ? state.index + 1 : 0;
    elements.progressCount.textContent = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    const percent = total ? (state.index / total) * 100 : 0;
    elements.progressFill.style.width = `${percent}%`;
    elements.progressTrack.setAttribute("aria-valuenow", String(Math.round(percent)));
    elements.scoreValue.textContent = String(state.score);
  }

  function updateSyllableButton(button, chosen = "") {
    const symbol = button.querySelector(".syllable-mark");
    button.classList.toggle("is-short", chosen === "short");
    button.classList.toggle("is-long", chosen === "long");
    button.classList.remove("is-correct", "is-incorrect");
    symbol.textContent = chosen === "short" ? "⏑" : chosen === "long" ? "—" : "";
    button.dataset.choice = chosen;
    button.setAttribute("aria-pressed", String(Boolean(chosen)));
    const choiceLabel = chosen === "short" ? t("shortMark") : chosen === "long" ? t("longMark") : t("notAnswered");
    button.setAttribute("aria-label", t("accessibleSyllable", button.dataset.syllable, choiceLabel));
  }

  function renderExercise() {
    const item = state.pool[state.index];
    if (!item) return;

    elements.source.textContent = item.source;
    elements.heading.textContent = item.text;
    elements.levelStamp.textContent = t("levelName")[item.level];
    elements.meter.textContent = item.meter;
    elements.syllables.replaceChildren();
    elements.result.hidden = true;
    elements.result.className = "result-message";
    elements.note.hidden = true;
    elements.note.textContent = "";
    elements.answerLegend.hidden = true;
    elements.interactionNote.hidden = false;
    elements.validate.hidden = false;
    elements.validate.disabled = false;
    elements.next.hidden = true;
    state.validated = false;
    state.correctCount = 0;
    state.earnedPoints = 0;
    state.perfect = false;

    item.syllables.forEach((syllable, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "syllable-button";
      button.dataset.index = String(index);
      button.dataset.syllable = syllable.text;
      button.dataset.correct = syllable.quantity;
      button.dataset.foot = String(syllable.foot);
      if (index < item.syllables.length - 1 && item.syllables[index + 1].foot !== syllable.foot) {
        button.classList.add("foot-break");
      }
      if (syllable.caesuraAfter) button.classList.add("caesura-break");

      const mark = document.createElement("span");
      mark.className = "syllable-mark";
      mark.setAttribute("aria-hidden", "true");
      const text = document.createElement("span");
      text.className = "syllable-text";
      text.textContent = syllable.text;
      button.append(mark, text);
      updateSyllableButton(button);
      elements.syllables.appendChild(button);
    });

    updateProgress();
  }

  function startPractice() {
    state.pool = getFilteredExcerpts();
    if (!state.pool.length) {
      elements.welcome.hidden = false;
      elements.exercise.hidden = true;
      elements.finish.hidden = true;
      elements.welcome.querySelector("[data-i18n='welcomeText']").textContent = t("noEntries");
      return;
    }
    state.index = 0;
    state.score = 0;
    state.started = true;
    elements.welcome.hidden = true;
    elements.finish.hidden = true;
    elements.exercise.hidden = false;
    renderExercise();
  }

  function cycleChoice(button) {
    if (state.validated || button.disabled) return;
    const current = button.dataset.choice || "";
    const next = current === "" ? "short" : current === "short" ? "long" : "short";
    updateSyllableButton(button, next);
  }

  function chooseQuantity(button, quantity) {
    if (state.validated || button.disabled) return;
    updateSyllableButton(button, quantity);
  }

  function validateAnswers() {
    if (state.validated) return;
    const item = state.pool[state.index];
    const buttons = Array.from(elements.syllables.querySelectorAll(".syllable-button"));
    let correctCount = 0;
    let points = 0;

    buttons.forEach((button) => {
      const chosen = button.dataset.choice;
      const correct = button.dataset.correct;
      const isCorrect = chosen === correct;
      if (isCorrect) {
        correctCount += 1;
        points += 10;
      }
      button.disabled = true;
      button.classList.remove("is-short", "is-long");
      button.classList.add(isCorrect ? "is-correct" : "is-incorrect");
      const marker = button.querySelector(".syllable-mark");
      marker.textContent = correct === "long" ? "—" : "⏑";
      const label = isCorrect ? t("correct") : chosen ? t("incorrect") : t("notAnswered");
      button.setAttribute("aria-label", t("accessibleSyllable", button.dataset.syllable, `${label}. ${t(correct === "long" ? "longMark" : "shortMark")}`));
    });

    state.score += points;
    state.correctCount = correctCount;
    state.earnedPoints = points;
    state.perfect = correctCount === buttons.length;
    state.validated = true;
    elements.scoreValue.textContent = String(state.score);
    elements.validate.disabled = true;
    elements.validate.hidden = true;
    elements.next.hidden = false;
    elements.next.querySelector("span").textContent = state.index === state.pool.length - 1 ? t("nextLast") : t("next");
    elements.interactionNote.hidden = true;
    elements.answerLegend.hidden = false;

    elements.result.hidden = false;
    elements.result.className = `result-message ${state.perfect ? "is-perfect" : correctCount === 0 ? "is-low" : ""}`;
    elements.result.textContent = state.perfect ? `${t("perfect")} ${t("result", correctCount, buttons.length, points)}` : t("result", correctCount, buttons.length, points);
    elements.note.hidden = false;
    elements.note.textContent = item.note && item.note[state.language] ? item.note[state.language] : "";
  }

  function nextExcerpt() {
    if (!state.validated) return;
    if (state.index >= state.pool.length - 1) {
      finishPractice();
      return;
    }
    state.index += 1;
    renderExercise();
  }

  function finishPractice() {
    elements.exercise.hidden = true;
    elements.finish.hidden = false;
    elements.finalScore.textContent = String(state.score);
    const lastExcerpt = state.pool[state.pool.length - 1];
    renderQuote("finish", quotes.completion?.[lastExcerpt?.level]);
    elements.finishCopy.textContent = t("completed", state.pool.length);
    elements.progressFill.style.width = "100%";
    elements.progressTrack.setAttribute("aria-valuenow", "100");
    elements.progressCount.textContent = `${String(state.pool.length).padStart(2, "0")} / ${String(state.pool.length).padStart(2, "0")}`;
  }

  elements.languageEn.addEventListener("click", () => setLanguage("en"));
  elements.languageFr.addEventListener("click", () => setLanguage("fr"));
  elements.start.addEventListener("click", startPractice);
  elements.validate.addEventListener("click", validateAnswers);
  elements.next.addEventListener("click", nextExcerpt);
  elements.replay.addEventListener("click", startPractice);
  elements.levelFilter.addEventListener("change", () => {
    updateLevelCount();
    if (state.started) startPractice();
  });

  elements.syllables.addEventListener("click", (event) => {
    const button = event.target.closest(".syllable-button");
    if (button && elements.syllables.contains(button)) cycleChoice(button);
  });

  elements.syllables.addEventListener("keydown", (event) => {
    const button = event.target.closest(".syllable-button");
    if (!button || !elements.syllables.contains(button) || state.validated) return;
    const key = event.key.toLowerCase();
    if (key === "b") {
      event.preventDefault();
      chooseQuantity(button, "short");
    } else if (key === "l") {
      event.preventDefault();
      chooseQuantity(button, "long");
    }
  });

  if (!excerpts.length || excerpts.some((item) => !validExcerpt(item))) {
    elements.welcome.querySelector("[data-i18n='welcomeText']").textContent = t("dataError");
    elements.start.disabled = true;
  }
  updateLevelCount();
  updateProgress();
  setLanguage("en");
})();
