# Simple Translator

A simplistic translator tool.

It allows you to set many language files and a specific default language file. Each language has a code.

```js
import Translator from "simple-translator";

const English = {
  Nav: {
    home: "Home",
    workspace: "Workspace",
    foo: {
      one: {
        two: {
          test: "Testing ${one} to ${three}"
        }
      }
    }
  }
};
const Chinese = {
  Nav: {
    home: "家"
  }
};

Translator.registerDefaultLanguage("en", English);
Translator.registerLanguage("zh", Chinese);
```

To change a language run:

```js
Translator.changeLanguage("zh");
```

To get a text value:

```js
Translator.translate("Nav.home");
```

Translation data can be nest as deep as you want. Each layer is denoted with a period.

If a translation key is not for that language, the translator looks for a key in the default language. If it is not there either, than it returns the original requested key.

Simple translator can also interpolate variables. Simply pass an object of values to the translator.

```js
Translator.translate("Nav.foo.one.two.test", {one: "foo", three: "bar"});