"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/utils/formatPrice";
import {
  getCharacterPortraitPath,
  getPageArtworkPath,
  renderNameTokens,
  validateRecipientName,
} from "@/lib/personalization/render";
import styles from "./PersonalizationWizard.module.css";

const STEPS = [
  { id: "name", label: "Name" },
  { id: "character", label: "Character" },
  { id: "dedication", label: "Dedication" },
  { id: "cover", label: "Cover" },
  { id: "preview", label: "Preview" },
  { id: "review", label: "Review" },
];

const APPEARANCE_STEPS = [
  { id: "skinTone", label: "Skin tone" },
  { id: "hairColour", label: "Hair colour" },
  { id: "hairStyle", label: "Hair style" },
];

export default function PersonalizationWizard({ book }) {
  const character = book.characters[0];
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [skinTone, setSkinTone] = useState(character.skinTones[0].id);
  const [hairColour, setHairColour] = useState(character.hairColours[0].id);
  const [hairStyle, setHairStyle] = useState(character.hairStyles[0].id);
  const [appearanceStep, setAppearanceStep] = useState(0);
  const [dedication, setDedication] = useState("");
  const [sender, setSender] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [showNameError, setShowNameError] = useState(false);

  const selection = { skinTone, hairColour, hairStyle };
  const nameError = showNameError ? validateRecipientName(name, character.nameField) : "";
  const nameIsValid = !validateRecipientName(name, character.nameField);
  const title = renderNameTokens(book.titleTemplate, [
    { id: character.id, name: name.trim() || "Your name" },
  ]);
  const portraitPath = getCharacterPortraitPath(book, selection);
  const currentPage = book.storyPages[pageIndex];
  const currentPageText = renderNameTokens(currentPage.text, [{ id: character.id, name }]);

  function continueFlow() {
    if (step === 0 && !nameIsValid) {
      setShowNameError(true);
      return;
    }

    if (step === 1 && appearanceStep < APPEARANCE_STEPS.length - 1) {
      setAppearanceStep((current) => current + 1);
      return;
    }

    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  function goBack() {
    if (step === 1 && appearanceStep > 0) {
      setAppearanceStep((current) => current - 1);
      return;
    }

    setStep((current) => Math.max(current - 1, 0));
  }

  function renderStepContent() {
    if (step === 0) {
      return (
        <section className={styles.panel} aria-labelledby="name-title">
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>Step 1 of {STEPS.length}</p>
              <h2 id="name-title">Who is this story for?</h2>
              <p>We’ll weave their name into the story and cover.</p>
            </div>
            <span className={`${styles.status} ${nameIsValid ? styles.valid : ""}`}>
              {nameIsValid ? "Name ready" : "Your name"}
            </span>
          </div>

          <label className={styles.fieldLabel} htmlFor="recipient-name">
            Recipient’s name
          </label>
          <div className={styles.inputRow}>
            <input
              id="recipient-name"
              className={`${styles.textInput} ${nameError ? styles.inputError : ""}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setShowNameError(true)}
              maxLength={character.nameField.maxLength}
              autoComplete="given-name"
              aria-invalid={Boolean(nameError)}
              aria-describedby={nameError ? "name-error name-help" : "name-help"}
              placeholder="For example, Sara"
            />
            <span className={styles.characterCount}>
              {name.length} / {character.nameField.maxLength}
            </span>
          </div>
          {nameError ? (
            <p className={styles.errorText} id="name-error" role="alert">
              {nameError}
            </p>
          ) : null}
          <p className={styles.helpText} id="name-help">
            Use 2–{character.nameField.maxLength} letters. Spaces, apostrophes, and hyphens are
            welcome.
          </p>

          {nameIsValid ? (
            <div className={styles.namePreview} aria-live="polite">
              <span>Shown in your story</span>
              <strong>{title}</strong>
            </div>
          ) : null}
        </section>
      );
    }

    if (step === 1) {
      return (
        <section className={styles.panel} aria-labelledby="character-title">
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>Step 2 of {STEPS.length}</p>
              <h2 id="character-title">Choose {name}’s character</h2>
              <p>Pick the skin and hair colours that feel right.</p>
            </div>
          </div>

          <ol className={styles.appearanceSteps} aria-label="Character substeps">
            {APPEARANCE_STEPS.map((item, index) => (
              <li
                key={item.id}
                className={`${styles.appearanceStep} ${
                  appearanceStep === index ? styles.appearanceStepCurrent : ""
                } ${appearanceStep > index ? styles.appearanceStepComplete : ""}`}
                aria-current={appearanceStep === index ? "step" : undefined}
              >
                <span>{appearanceStep > index ? "✓" : index + 1}</span>
                {item.label}
              </li>
            ))}
          </ol>

          <div className={styles.appearanceContent}>
            <div className={styles.appearanceHeading} aria-live="polite">
              <span>
                Character option {appearanceStep + 1} of {APPEARANCE_STEPS.length}
              </span>
              <h3>{APPEARANCE_STEPS[appearanceStep].label}</h3>
            </div>

            <div className={styles.choices}>
              {appearanceStep === 0 ? (
              <fieldset className={styles.choiceGroup}>
                <legend>Skin tone</legend>
                <div className={styles.swatches}>
                  {character.skinTones.map((option) => (
                    <label
                      key={option.id}
                      className={`${styles.swatchOption} ${
                        skinTone === option.id ? styles.swatchSelected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="skin-tone"
                        value={option.id}
                        checked={skinTone === option.id}
                        onChange={() => setSkinTone(option.id)}
                      />
                      <span className={styles.colorPatch} style={{ backgroundColor: option.color }} />
                      <span>{option.label}</span>
                      <span className={styles.optionCode}>{skinTone === option.id ? "Selected" : ""}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              ) : null}

              {appearanceStep === 1 ? (
              <fieldset className={styles.choiceGroup}>
                <legend>Hair colour</legend>
                <div className={styles.swatches}>
                  {character.hairColours.map((option) => (
                    <label
                      key={option.id}
                      className={`${styles.swatchOption} ${
                        hairColour === option.id ? styles.swatchSelected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="hair-colour"
                        value={option.id}
                        checked={hairColour === option.id}
                        onChange={() => setHairColour(option.id)}
                      />
                      <span className={styles.colorPatch} style={{ backgroundColor: option.color }} />
                      <span>{option.label}</span>
                      <span className={styles.optionCode}>{hairColour === option.id ? "Selected" : ""}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              ) : null}

              {appearanceStep === 2 ? (
              <fieldset className={styles.choiceGroup}>
                <legend>Hair style</legend>
                <div className={styles.styleOptions}>
                  {character.hairStyles.map((option) => (
                    <label
                      key={option.id}
                      className={`${styles.styleOption} ${
                        hairStyle === option.id ? styles.styleSelected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="hair-style"
                        value={option.id}
                        checked={hairStyle === option.id}
                        onChange={() => setHairStyle(option.id)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <p className={styles.helpText}>
                  Hairstyle artwork is still in progress, so both choices currently preview the
                  supplied bob illustration.
                </p>
              </fieldset>
              ) : null}
            </div>

            <div className={styles.appearanceNavigation}>
              <button
                type="button"
                onClick={() => setAppearanceStep((current) => Math.max(current - 1, 0))}
                disabled={appearanceStep === 0}
                aria-label="Previous character option"
              >
                <span aria-hidden="true">←</span> Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setAppearanceStep((current) =>
                    Math.min(current + 1, APPEARANCE_STEPS.length - 1),
                  )
                }
                disabled={appearanceStep === APPEARANCE_STEPS.length - 1}
                aria-label="Next character option"
              >
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
      );
    }

    if (step === 2) {
      return (
        <section className={styles.panel} aria-labelledby="dedication-title">
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>Step 3 of {STEPS.length} · Optional</p>
              <h2 id="dedication-title">Add a loving dedication</h2>
              <p>Leave a personal message on the first page, or skip this step.</p>
            </div>
          </div>

          <label className={styles.fieldLabel} htmlFor="dedication">
            Your message
          </label>
          <textarea
            id="dedication"
            className={styles.textarea}
            value={dedication}
            onChange={(event) => setDedication(event.target.value)}
            maxLength={300}
            rows={5}
            placeholder={`Dear ${name}, ...`}
          />
          <div className={styles.inputFooter}>
            <p className={styles.helpText}>Your message will be printed exactly as written.</p>
            <span className={styles.characterCount}>{dedication.length} / 300</span>
          </div>
          <label className={styles.fieldLabel} htmlFor="sender">
            From (optional)
          </label>
          <input
            id="sender"
            className={styles.textInput}
            value={sender}
            onChange={(event) => setSender(event.target.value)}
            maxLength={40}
            placeholder="Mum & Dad"
          />
        </section>
      );
    }

    if (step === 3) {
      return (
        <section className={styles.panel} aria-labelledby="cover-title">
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>Step 4 of {STEPS.length}</p>
              <h2 id="cover-title">Your book cover</h2>
              <p>One cover design for this first edition. Your title updates with the name.</p>
            </div>
          </div>

          <div className={styles.coverChoice}>
            <div className={styles.coverMock} style={{ backgroundColor: book.cover.color }}>
              <p className={styles.coverHeading}>{title}</p>
              <div className={styles.coverCharacter}>
                <Image src={portraitPath} alt="" fill sizes="15rem" />
              </div>
              <span className={styles.coverFooter}>A story made especially for you</span>
            </div>
            <div className={styles.coverDetails}>
              <span className={styles.selectedMark} aria-hidden="true">✓</span>
              <div>
                <strong>{book.cover.label}</strong>
                <p>The story title is personalized with {name}’s name.</p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (step === 4) {
      return (
        <section className={styles.panel} aria-labelledby="preview-title">
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>Step 5 of {STEPS.length}</p>
              <h2 id="preview-title">Preview {name}’s story</h2>
              <p>Use the arrows to turn through the illustrated pages.</p>
            </div>
          </div>

          <div className={styles.pagePreview}>
            <div className={styles.pageArtwork}>
              <Image
                src={getPageArtworkPath(book, selection, currentPage)}
                alt={`Illustration for page ${pageIndex + 1} of ${book.title}`}
                fill
                sizes="(max-width: 48em) 100vw, 52rem"
                priority
              />
            </div>
            <div className={styles.pageCopy} aria-live="polite">
              <span>
                Page {pageIndex + 1} of {book.storyPages.length}
              </span>
              <p>{currentPageText}</p>
            </div>
            <div className={styles.pageControls}>
              <button
                type="button"
                onClick={() => setPageIndex((index) => Math.max(index - 1, 0))}
                disabled={pageIndex === 0}
              >
                Previous page
              </button>
              <div className={styles.pageDots} aria-label="Choose a story page">
                {book.storyPages.map((page, index) => (
                  <button
                    key={page.id}
                    type="button"
                    className={pageIndex === index ? styles.pageDotActive : ""}
                    aria-label={`Go to page ${index + 1}`}
                    aria-current={pageIndex === index ? "page" : undefined}
                    onClick={() => setPageIndex(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setPageIndex((index) => Math.min(index + 1, book.storyPages.length - 1))
                }
                disabled={pageIndex === book.storyPages.length - 1}
              >
                Next page
              </button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className={styles.panel} aria-labelledby="review-title">
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.eyebrow}>Step 6 of {STEPS.length}</p>
            <h2 id="review-title">A little look at your book</h2>
            <p>Review the choices before you finish this preview.</p>
          </div>
          <span className={`${styles.status} ${styles.valid}`}>Ready to preview</span>
        </div>

        <div className={styles.reviewGrid}>
          <div className={styles.reviewCover} style={{ backgroundColor: book.cover.color }}>
            <strong>{title}</strong>
            <div className={styles.reviewCharacter}>
              <Image src={portraitPath} alt="" fill sizes="12rem" />
            </div>
          </div>
          <dl className={styles.reviewDetails}>
            <div>
              <dt>Recipient</dt>
              <dd>{name}</dd>
            </div>
            <div>
              <dt>Character</dt>
              <dd>
                {character.skinTones.find((option) => option.id === skinTone)?.label} skin ·{" "}
                {character.hairColours.find((option) => option.id === hairColour)?.label} hair ·{" "}
                {character.hairStyles.find((option) => option.id === hairStyle)?.label} cut
              </dd>
            </div>
            <div>
              <dt>Cover</dt>
              <dd>{book.cover.label}</dd>
            </div>
            <div>
              <dt>Dedication</dt>
              <dd>{dedication.trim() || "No dedication added"}</dd>
            </div>
            {sender.trim() ? (
              <div>
                <dt>From</dt>
                <dd>{sender.trim()}</dd>
              </div>
            ) : null}
            <div className={styles.reviewPrice}>
              <dt>Book price</dt>
              <dd>{formatPrice(book.priceFrom)}</dd>
            </div>
          </dl>
        </div>

        <p className={styles.reviewNote}>
          This is a personalization preview only. No order has been placed.
        </p>
      </section>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/books">Books</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/books/${book.slug}`}>{book.title}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Personalize</span>
        </nav>

        <header className={styles.header}>
          <div>
            <h1>Personalize your book</h1>
            <p>Start with a name, then make the character and story your own.</p>
          </div>
          <Link className={styles.backLink} href={`/books/${book.slug}`}>
            Back to book details
          </Link>
        </header>

        <ol className={styles.stepper} aria-label="Personalization steps">
          {STEPS.map((item, index) => (
            <li
              key={item.id}
              className={`${styles.step} ${step === index ? styles.stepCurrent : ""} ${
                step > index ? styles.stepComplete : ""
              }`}
              aria-current={step === index ? "step" : undefined}
            >
              <span className={styles.stepNumber}>{step > index ? "✓" : index + 1}</span>
              <span className={styles.stepLabel}>{item.label}</span>
            </li>
          ))}
        </ol>

        <div className={styles.content}>
          <div className={styles.mainColumn}>
            {renderStepContent()}
            <div className={styles.navigation}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={goBack}
                disabled={step === 0}
              >
                Back
              </button>
              {step < STEPS.length - 1 ? (
                <button type="button" className={styles.primaryButton} onClick={continueFlow}>
                  {step === 1 && appearanceStep < APPEARANCE_STEPS.length - 1
                    ? `Next: ${APPEARANCE_STEPS[appearanceStep + 1].label}`
                    : step === STEPS.length - 2
                      ? "Review your choices"
                      : "Continue"}
                </button>
              ) : (
                <Link className={styles.primaryButton} href={`/books/${book.slug}`}>
                  Back to book details
                </Link>
              )}
            </div>
          </div>

          <aside className={styles.summary} aria-label="Personalization summary">
            <p className={styles.summaryEyebrow}>Your book so far</p>
            <div className={styles.summaryCover} style={{ backgroundColor: book.cover.color }}>
              <strong>{title}</strong>
              <div className={styles.summaryCharacter}>
                <Image src={portraitPath} alt="" fill sizes="(max-width: 48em) 70vw, 14rem" />
              </div>
            </div>
            <h2>{book.title}</h2>
            <p>{formatPrice(book.priceFrom)} · {book.storyPages.length} illustrated pages</p>
            <ul className={styles.summaryList}>
              <li>Name: <strong>{name || "Not entered yet"}</strong></li>
              <li>Skin: <strong>{character.skinTones.find((option) => option.id === skinTone)?.label}</strong></li>
              <li>Hair: <strong>{character.hairColours.find((option) => option.id === hairColour)?.label}</strong></li>
              <li>Style: <strong>{character.hairStyles.find((option) => option.id === hairStyle)?.label}</strong></li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
