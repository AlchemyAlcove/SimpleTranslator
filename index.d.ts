declare module "simple-translator" {
  interface SimpleTranslatorLibrary {
    [pathToEntry: string]: string | SimpleTranslatorLibrary;
  }

  interface SimpleTranslator {
    defaultLanguageKey: string | null;
    defaultLanguageLibrary: object | null;
    language: string | null;
    languages: object;
    /** Switch from the current language to a another registered language. */
    changeLanguage(languageKey: string): void;
    /** Returns the library data object for the given language key */
    getLibrary(languageKey: string): object;
    /** Sets the default language and library data set for this instance of Translator */
    registerDefaultLanguage(languageKey: string, library: SimpleTranslatorLibrary): void;
    /** Adds a language data set to the set of available languages.  */
    registerLanguage(languageKey: string, library: SimpleTranslatorLibrary): void;
    /** Returns the translation entry for a given key or path in the library data structure. Optional 'values' object contains key-value pairs for dynamic substitution. If no entry is found, path is returned. */
    translate(path: string, values?: object): string;
  }

  const SimpleTranslator: SimpleTranslator;
  export default SimpleTranslator;
}
