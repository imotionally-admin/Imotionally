import { describe, expect, it } from "vitest";
import SARA_BOOK from "../../content/books/sara-and-the-little-fairy/book";
import {
  getCharacterPortraitPath,
  getPageArtworkPath,
  getVariantKey,
  renderNameTokens,
  validateRecipientName,
} from "./render";

describe("recipient name personalization", () => {
  it("accepts valid names and rejects short, long, or unsupported values", () => {
    const nameField = SARA_BOOK.characters[0].nameField;

    expect(validateRecipientName("Sara O'Neil", nameField)).toBe("");
    expect(validateRecipientName("A", nameField)).toContain("at least");
    expect(validateRecipientName("A name that is too long", nameField)).toContain("no more than");
    expect(validateRecipientName("Sara123", nameField)).toContain("letters");
  });

  it("replaces the character's name token in story copy", () => {
    expect(
      renderNameTokens("{{c1.name}} found a fairy. {{c1.name}} smiled.", [
        { id: "c1", name: "Amara" },
      ]),
    ).toBe("Amara found a fairy. Amara smiled.");
  });
});

describe("book artwork selection", () => {
  it("resolves the selected skin and hair-colour variation for page and character art", () => {
    const selection = { skinTone: "s2", hairColour: "hc2", hairStyle: "layer-cut" };

    expect(getVariantKey(SARA_BOOK, selection)).toBe("H1_S2_HC2");
    expect(getPageArtworkPath(SARA_BOOK, selection, SARA_BOOK.storyPages[0])).toBe(
      "/book/H1_S2_HC2/H1_S2_HC2/1.jpg",
    );
    expect(getCharacterPortraitPath(SARA_BOOK, selection)).toBe(
      "/book/H1_S2_HC2/H1_S2_HC2/H1_S2_HC2.jpg",
    );
  });
});
