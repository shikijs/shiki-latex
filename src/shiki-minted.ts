#!/usr/bin/env node

import yargs from "yargs";
import fs from "fs";
import { getHighlighter, loadTheme } from "shiki";
import { TLang } from "shiki-languages";
import { TTheme, IShikiTheme } from "shiki-themes";
import { renderToLaTeX } from ".";

(async () => {
  const themePath = "shiki-minted-theme.pyg";
  const argv = yargs.array("P").argv;
  debug(argv);
  debug(process.argv);
  const {
    S: themeToStore,
    l: language,
    P: options,
    o: outputPath,
    _: [inputPath]
  } = argv;
  if (themeToStore !== undefined)
    return fs.writeFileSync(themePath, themeToStore);
  if (
    language !== undefined &&
    outputPath !== undefined &&
    inputPath !== undefined
  ) {
    let theme = "default";
    if (fs.existsSync(themePath)) theme = fs.readFileSync(themePath, "utf8");
    if (options !== undefined) {
      for (const option of options) {
        const [key, value] = (option as string).split("=");
        if (key === "style") theme = value;
      }
    }
    if (theme === "default") theme = "light_plus";
    const highlighter = await getHighlighter({
      theme: theme as TTheme | IShikiTheme
    })
      .catch(() => getHighlighter({ theme: loadTheme(theme) }))
      .catch(() => {
        console.error(`Failed to load theme: ${theme}`);
        process.exit(1);
      });
    const input = fs.readFileSync(inputPath, "utf8").trimRight();
    const lines = highlighter.codeToThemedTokens(input, language as TLang);
    debug(lines);
    return fs.writeFileSync(outputPath as string, renderToLaTeX(lines));
  }
  console.error(`Unrecognized invocation:`);
  console.error(JSON.stringify(argv, undefined, 2));
  console.error(JSON.stringify(process.argv, undefined, 2));
  process.exit(1);
})();

function debug(value: any): void {
  if (process.env.SHIKI_LATEX_DEBUG === undefined) return;
  fs.appendFileSync(
    "shiki-minted-debug.json",
    JSON.stringify(value, undefined, 2) + "\n"
  );
}
