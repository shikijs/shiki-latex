#!/usr/bin/env node

import fs from "fs";
import { getHighlighter } from "shiki";
import { TLang } from "shiki-languages";
import { TTheme, IShikiTheme } from "shiki-themes";
import { renderToLaTeX } from "./index";

(async function() {
  const themePath = "shiki-theme.pyg";
  // fs.appendFileSync("debug.json", JSON.stringify(process.argv, null, 2));
  switch (process.argv[2]) {
    case "-S": {
      const [
        _node,
        _shiki,
        _S,
        theme,
        _f,
        _latex,
        _P,
        _commandprefix
      ] = process.argv;
      fs.writeFileSync(themePath, theme);
      break;
    }
    case "-l": {
      const [
        _node,
        _shiki,
        _l,
        language,
        _f,
        _latex,
        _P,
        _commandprefix,
        _F,
        _tokenmerge,
        _o,
        outputPath,
        inputPath
      ] = process.argv;
      const storedTheme = fs.existsSync(themePath)
        ? fs.readFileSync(themePath, "utf-8")
        : "default";
      const theme =
        storedTheme === "default"
          ? "light_plus"
          : (storedTheme as TTheme | IShikiTheme);
      const highlighter = await getHighlighter({ theme });
      const input = fs.readFileSync(inputPath, "utf-8").trimRight();
      const lines = highlighter.codeToThemedTokens(input, language as TLang);
      // fs.appendFileSync("debug.json", JSON.stringify(lines, null, 2));
      fs.writeFileSync(outputPath, renderToLaTeX(lines));
      break;
    }
    default: {
      console.error(`Unrecognized invocation: ${process.argv}`);
      process.exit(1);
    }
  }
})();
