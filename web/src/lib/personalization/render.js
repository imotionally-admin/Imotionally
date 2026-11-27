export function validateRecipientName(value, nameField) {
  const name = value.trim();

  if (name.length < nameField.minLength) {
    return `Please enter at least ${nameField.minLength} characters.`;
  }

  if (name.length > nameField.maxLength) {
    return `Please enter no more than ${nameField.maxLength} characters.`;
  }

  if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name)) {
    return "Use letters, spaces, apostrophes, or hyphens only.";
  }

  return "";
}

export function renderNameTokens(template, characters) {
  const namesById = Object.fromEntries(
    characters.map((character) => [character.id, character.name]),
  );

  return template.replace(/\{\{(c\d+)\.name\}\}/g, (token, characterId) => {
    return namesById[characterId] ?? token;
  });
}

export function getVariantKey(book, selection) {
  const character = book.characters[0];
  const skinTone = character.skinTones.find((option) => option.id === selection.skinTone);
  const hairColour = character.hairColours.find((option) => option.id === selection.hairColour);
  const hairStyle = character.hairStyles.find((option) => option.id === selection.hairStyle);

  if (!skinTone || !hairColour || !hairStyle) {
    throw new Error(`Unknown character appearance selection for "${book.slug}".`);
  }

  return `${hairStyle.code}_${skinTone.code}_${hairColour.code}`;
}

export function getBookArtworkPath(book, selection, fileName) {
  const variant = getVariantKey(book, selection);
  const variantFolder = book.artwork.variantFolder.replaceAll("{variant}", variant);

  return `${book.artwork.root}/${variantFolder}/${fileName}`;
}

export function getPageArtworkPath(book, selection, page) {
  const fileName = book.artwork.pageFile.replace("{page}", String(page.artwork));
  return getBookArtworkPath(book, selection, fileName);
}

export function getCharacterPortraitPath(book, selection) {
  const variant = getVariantKey(book, selection);
  const fileName = book.artwork.portraitFile.replace("{variant}", variant);
  return getBookArtworkPath(book, selection, fileName);
}
