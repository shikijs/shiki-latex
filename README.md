# Shiki LaTeX

**A [Shiki](https://shiki.matsu.io) renderer for [LaTeX](https://www.latex-project.org). Compatible with [minted](https://github.com/gpoore/minted), replacing [Pygments](https://pygments.org).**

[**Source**](https://github.com/leafac/shiki-latex) • [**Package**](https://www.npmjs.com/package/shiki-latex) • ![.github/workflows/main.yml](https://github.com/leafac/shiki-latex/workflows/.github/workflows/main.yml/badge.svg)

# Comparison

| [Shiki](https://shiki.matsu.io)                      | [Pygments](https://pygments.org)                           |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| <img alt="Shiki" src="docs/shiki.png" width="702" /> | <img alt="Pygments" src="docs/pygments.png" width="685" /> |

# Installation

Install [Node.js](https://nodejs.org/) and run:

```console
$ npm install shiki-latex
```

# Using with Minted

```latex
\usepackage{minted}
\renewcommand{\MintedPygmentize}{./node_modules/.bin/shiki-minted}
% Optional: Use Shiki themes with \usemintedstyle{nord}
```

# Using Programmatically

```ts
import { getHighlighter } from "shiki";
import { renderToLaTeX } from "shiki-latex";

getHighlighter({ theme: "light_plus" }).then(highlighter => {
  const lines = highlighter.codeToThemedTokens(
    `const name = "Leandro Facchinetti";`,
    "ts"
  );
  console.log(renderToLaTeX(lines));
});
```

The package comes with type definitions for [TypeScript](https://www.typescriptlang.org).
