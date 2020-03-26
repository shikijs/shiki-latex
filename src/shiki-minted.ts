#!/usr/bin/env node

import * as shiki from "shiki";
import * as shikiHighlighter from "shiki/dist/highlighter";
import * as shikiLanguages from "shiki-languages";
import * as shikiThemes from "shiki-themes";
import * as shikiLatex from ".";
import * as yargs from "yargs";
import * as fs from "fs";
process.env.DEBUG_COLORS = "false";
import createDebug from "debug";

(async () => {
  createDebug.log = (message: string) =>
    fs.appendFileSync("shiki-minted-debug.log", message + "\n");
  const debug = createDebug("shiki-latex");
  const themePath = "shiki-minted-theme.pyg";
  const argv = yargs
    .string("S")
    .string("l")
    .array("P")
    .string("o").argv;
  debug(`process.argv: ${JSON.stringify(process.argv, null, 2)}`);
  debug(`argv: ${JSON.stringify(argv, null, 2)}`);
  const {
    S: themeToStore,
    l: language,
    P: options,
    o: outputPath,
    _: [inputPath]
  } = argv;
  if (themeToStore !== undefined) {
    fs.writeFileSync(themePath, themeToStore);
    debug(`Stored theme ‘${themeToStore}’ at ‘${themePath}’`);
    process.exit();
  }
  if (
    language !== undefined &&
    outputPath !== undefined &&
    inputPath !== undefined
  ) {
    let theme = "default";
    try {
      theme = fs.readFileSync(themePath, "utf8");
      debug(`Theme ‘${theme}’ selected from ‘${themePath}’`);
    } catch {}
    if (options !== undefined) {
      for (const option of options) {
        const [key, value] = option.toString().split("=");
        if (key === "style") {
          theme = value;
          debug(`Theme ‘${theme}’ selected from command-line option ‘${key}’`);
        }
      }
    }
    if (theme === "default") theme = "light_plus";
    debug(`Final theme selection: ‘${theme}’`);
    let highlighter: shikiHighlighter.Highlighter;
    try {
      highlighter = await shiki.getHighlighter({
        theme: theme as shikiThemes.TTheme | shikiThemes.IShikiTheme
      });
      debug(`Loaded built-in theme: ‘${theme}’`);
    } catch {
      try {
        highlighter = await shiki.getHighlighter({
          theme: shiki.loadTheme(theme)
        });
        debug(`Loaded theme file: ‘${theme}’`);
      } catch {
        console.error(`Failed to load theme: ‘${theme}’`);
        process.exit(1);
      }
    }
    const input = fs.readFileSync(inputPath, "utf8");
    debug(`input: ‘${input}’`);
    const lines = highlighter.codeToThemedTokens(
      input.slice(0, input.length - 1),
      language as shikiLanguages.TLang
    );
    debug(`lines: ${JSON.stringify(lines, null, 2)}`);
    const latex = shikiLatex.renderToLaTeX(lines);
    debug(`latex: ‘${latex}’`);
    fs.writeFileSync(outputPath, latex);
    process.exit();
  }
  console.error(`Unrecognized invocation
${JSON.stringify(process.argv, null, 2)}
${JSON.stringify(argv, null, 2)}
`);
  process.exit(1);
})();
