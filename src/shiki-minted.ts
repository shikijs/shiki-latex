#!/usr/bin/env node

import yargs from "yargs";
import fs from "fs";
import { getHighlighter } from "shiki";
import { TLang } from "shiki-languages";
import { TTheme, IShikiTheme } from "shiki-themes";
import { renderToLaTeX } from ".";

(async () => {
  const themePath = "shiki-minted-theme.pyg";
  const argv = yargs.array("P").argv;
  // fs.appendFileSync("shiki-minted-debug.json", JSON.stringify(argv, undefined, 2));
  // fs.appendFileSync("shiki-minted-debug.json", JSON.stringify(process.argv, undefined, 2));
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
    });
    const input = fs.readFileSync(inputPath, "utf8").trimRight();
    const lines = highlighter.codeToThemedTokens(input, language as TLang);
    // fs.appendFileSync("shiki-minted-debug.json", JSON.stringify(lines, undefined, 2));
    return fs.writeFileSync(outputPath as string, renderToLaTeX(lines));
  }
  console.error(`Unrecognized invocation:`);
  console.error(JSON.stringify(argv, undefined, 2));
  console.error(JSON.stringify(process.argv, undefined, 2));
  process.exit(1);
})();
