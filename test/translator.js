/* eslint-disable no-template-curly-in-string */
import test from "ava";
import Translator from "../index.js";

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

test("nothing functions without languages", t => {
  t.deepEqual(Translator.languages, {});
  t.deepEqual(Translator.translate("test"), "test");
});

test("can't change to a language that doesn't exist", t => {
  Translator.changeLanguage("zh");
  t.deepEqual(Translator.language, null);
});

test("loading translations", t => {
  Translator.registerDefaultLanguage("en", English);

  t.deepEqual(Translator.language, "en");
  t.deepEqual(Translator.translate("Nav.home"), "Home");
});

test("find other languages", t => {
  Translator.registerDefaultLanguage("en", English);
  Translator.registerLanguage("zh", Chinese);

  t.deepEqual(Translator.translate("Nav.home"), "Home");

  Translator.changeLanguage("zh");

  t.deepEqual(Translator.translate("Nav.home"), "家");
});

test("should fall back to default if no translation found", t => {
  Translator.registerDefaultLanguage("en", English);
  Translator.registerLanguage("zh", Chinese);

  t.deepEqual(Translator.translate("Nav.workspace"), "Workspace");

  Translator.changeLanguage("zh");

  t.deepEqual(Translator.translate("Nav.workspace"), "Workspace");
});

test("should fall back to key if no default translation found", t => {
  Translator.registerDefaultLanguage("en", English);
  Translator.registerLanguage("zh", Chinese);

  t.deepEqual(Translator.translate("Nav.test"), "Nav.test");

  Translator.changeLanguage("zh");

  t.deepEqual(Translator.translate("Nav.test"), "Nav.test");
});

test("should insert variables", t => {
  Translator.registerDefaultLanguage("en", English);

  t.deepEqual(Translator.translate("Nav.foo.one.two.test", { one: "foo", three: "bar" }), "Testing foo to bar");
});
