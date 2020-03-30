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
        ).codeToThemedTokens(`const strangeCharacters = "\\{}%$#";`, "ts")
      )
    ).toMatchInlineSnapshot(`
      "\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
      \\\\textcolor[HTML]{0000FF}{const}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{001080}{strangeCharacters}\\\\textcolor[HTML]{000000}{ = }\\\\textcolor[HTML]{A31515}{\\"\\\\textbackslash{}\\\\{\\\\}%$#\\"}\\\\textcolor[HTML]{000000}{;}
      \\\\end{Verbatim}
      "
    `);
  });
});
