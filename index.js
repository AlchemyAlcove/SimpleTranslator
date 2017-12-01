const isNil = require("lodash/isNil");

const Translator = {
  defaultLanguageKey: null,
  defaultLanguageLibrary: null,

  language: null,

  languages: {},

  changeLanguage(language) {
    if(this.languages.hasOwnProperty(language)) {
      this.language = language;
    } else {
      this.language = this.defaultLanguageKey;
    }
  },

  findTranslation(translation, id) {
    let idPieces = id.split(".");

    for(let i = 0; i < idPieces.length; i++) {
      let piece = idPieces[i];
      if(isNil(translation[piece])) {
        return(null);
      } else {
        translation = translation[piece];
      }
    }

    return(translation);
  },

  registerDefaultLanguage(key, library) {
    this.defaultLanguageKey = key;
    this.defaultLanguageLibrary = library;
    if(this.language === null) {
      this.language = this.defaultLanguageKey;
    }
    this.registerLanguage(key, library);
  },

  registerLanguage(key, library) {
    let languages = this.languages;
    languages[key] = library;
    this.languages = languages;
  },

  translate(id, values = {}) {
    let library = this.getLibrary();
    if(typeof(library) === "undefined") {
      return(id);
    }

    let translation = this.findTranslation(library, id);

    // defaults
    if(isNil(translation) && this.language !== this.defaultLanguageKey) {
      translation = this.findTranslation(this.getLibrary(this.defaultLanguageKey), id);
    }
    if(isNil(translation)) {
      translation = id;
    }

    // interpolate
    for(let key in values) {
      translation = translation.split("${" + key + "}").join(values[key]);
    }

    return(translation);
  },

  getLibrary(language = this.language) {
    return(this.languages[language]);
  }
};

module.exports = Translator;
