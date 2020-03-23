import { renderToLaTeX } from ".";
import { getHighlighter } from "shiki";

test("renderToLaTeX()", async () => {
  const highlighter = await getHighlighter({ theme: "light_plus" });
  const lines = highlighter.codeToThemedTokens(
    `const name = "Leandro Facchinettti \\{}%$#";`,
    "ts"
  );
  expect(renderToLaTeX(lines)).toMatchInlineSnapshot(`
    "\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
    \\\\textcolor[HTML]{0000FF}{const}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{001080}{name}\\\\textcolor[HTML]{000000}{ = }\\\\textcolor[HTML]{A31515}{\\"Leandro Facchinettti \\\\\\\\\\\\{\\\\}%$#\\"}\\\\textcolor[HTML]{000000}{;}
    \\\\end{Verbatim}
    "
  `);
});
