import { isNil } from "lodash";
const Translator = {
  defaultLanguageKey: null,
  defaultLanguageLibrary: null,
  language: null,
  languages: {},

  changeLanguage(language) {
    if (!isNil(this.languages[language])) {
      this.language = language;
    } else {
      this.language = this.defaultLanguageKey;
    }
  },

  findTranslation(translation, id) {
    const idPieces = id.split(".");

    for (let i = 0; i < idPieces.length; i++) {
      const piece = idPieces[i];

      if (isNil(translation[piece])) {
        return null;
      } else {
        translation = translation[piece];
      }
    }

    return translation;
  },

  registerDefaultLanguage(key, library) {
    this.defaultLanguageKey = key;
    this.defaultLanguageLibrary = library;

    if (this.language === null) {
      this.language = this.defaultLanguageKey;
    }

    this.registerLanguage(key, library);
  },

  registerLanguage(key, library) {
    const languages = this.languages;
    languages[key] = library;
    this.languages = languages;
  },

  translate(id, values = {}) {
    const library = this.getLibrary();

    if (typeof library === "undefined") {
      return id;
    }

    let translation = this.findTranslation(library, id);

    if (isNil(translation) && this.language !== this.defaultLanguageKey) {
      translation = this.findTranslation(this.getLibrary(this.defaultLanguageKey), id);
    }

    if (isNil(translation)) {
      translation = id;
    }

    for (const key in values) {
      translation = translation.split("${" + key + "}").join(values[key]);
    }

    return translation;
  },

  getLibrary(language = this.language) {
    return this.languages[language];
  }

};
export default Translator;