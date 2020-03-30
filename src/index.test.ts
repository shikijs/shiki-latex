import { renderToLaTeX } from ".";
import { getHighlighter } from "shiki";

describe("renderToLaTeX()", () => {
  test("basic rendering", async () => {
    expect(
      renderToLaTeX(
        (
          await getHighlighter({
            theme: "light_plus"
          })
        ).codeToThemedTokens(`const name = "Leandro Facchinettti";`, "ts")
      )
    ).toMatchInlineSnapshot(`
      "\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
      \\\\textcolor[HTML]{0000FF}{const}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{001080}{name}\\\\textcolor[HTML]{000000}{ = }\\\\textcolor[HTML]{A31515}{\\"Leandro Facchinettti\\"}\\\\textcolor[HTML]{000000}{;}
      \\\\end{Verbatim}
      "
    `);
  });

  test("strange characters", async () => {
    expect(
      renderToLaTeX(
        (
          await getHighlighter({
            theme: "light_plus"
          })
        ).codeToThemedTokens(`const strangeCharacters = "\\{}%$#^_";`, "ts")
      )
    ).toMatchInlineSnapshot(`
      "\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
      \\\\textcolor[HTML]{0000FF}{const}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{001080}{strangeCharacters}\\\\textcolor[HTML]{000000}{ = }\\\\textcolor[HTML]{A31515}{\\"\\\\textbackslash{}\\\\{\\\\}%$#^_\\"}\\\\textcolor[HTML]{000000}{;}
      \\\\end{Verbatim}
      "
    `);
  });

  test("mathescape", async () => {
    expect(
      renderToLaTeX(
        (
          await getHighlighter({
            theme: "light_plus"
          })
        ).codeToThemedTokens(
          `// This is $x^2$. A raw backslash: \\. And so on$\\cdots$
const name = "Leandro Facchinettti";`,
          "ts"
        ),
        { mathescape: true }
      )
    ).toMatchInlineSnapshot(`
"\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\},codes={\\\\catcode\`\\\\$=3\\\\catcode\`\\\\^=7\\\\catcode\`\\\\_=8}]
\\\\textcolor[HTML]{008000}{// This is $x^2$. A raw backslash: \\\\textbackslash{}. And so on$\\\\cdots$}
\\\\textcolor[HTML]{0000FF}{const}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{001080}{name}\\\\textcolor[HTML]{000000}{ = }\\\\textcolor[HTML]{A31515}{\\"Leandro Facchinettti\\"}\\\\textcolor[HTML]{000000}{;}
\\\\end{Verbatim}
"
`);
  });
});
