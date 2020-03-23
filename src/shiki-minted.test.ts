import child_process from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const themePath = "shiki-minted-theme.pyg";

describe("set theme", () => {
  expect(exec(() => `-S default -f latex -P commandprefix=PYG`)).toBe("");
  expect(fs.readFileSync(themePath, "utf8")).toBe("default");
});

describe("produce LaTeX", () => {
  test("without theme", () => {
    expect(
      exec(
        (inputPath, outputPath) =>
          `-l ts -f latex -P commandprefix=PYG -F tokenmerge -o ${outputPath} ${inputPath}`
      )
    ).toMatchInlineSnapshot(`
      "\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
      \\\\textcolor[HTML]{0000FF}{const}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{001080}{name}\\\\textcolor[HTML]{000000}{ = }\\\\textcolor[HTML]{A31515}{\\"Leandro Facchinettti\\"}\\\\textcolor[HTML]{000000}{;}
      \\\\end{Verbatim}
      "
    `);
  });

  test("with built-in theme", () => {
    exec(() => `-S nord -f latex -P commandprefix=PYG`);
    expect(
      exec(
        (inputPath, outputPath) =>
          `-l ts -f latex -P commandprefix=PYG -F tokenmerge -o ${outputPath} ${inputPath}`
      )
    ).toMatchInlineSnapshot(`
      "\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
      \\\\textcolor[HTML]{81A1C1}{const}\\\\textcolor[HTML]{D8DEE9}{ }\\\\textcolor[HTML]{D8DEE9}{name}\\\\textcolor[HTML]{D8DEE9}{ }\\\\textcolor[HTML]{81A1C1}{=}\\\\textcolor[HTML]{D8DEE9}{ }\\\\textcolor[HTML]{ECEFF4}{\\"}\\\\textcolor[HTML]{A3BE8C}{Leandro Facchinettti}\\\\textcolor[HTML]{ECEFF4}{\\"}\\\\textcolor[HTML]{81A1C1}{;}
      \\\\end{Verbatim}
      "
    `);
  });

  test("with file theme", () => {
    exec(
      () =>
        `-S ${path.join(
          __dirname,
          "..",
          "assets",
          "synthwave-color-theme.json"
        )} -f latex -P commandprefix=PYG`
    );
    expect(
      exec(
        (inputPath, outputPath) =>
          `-l ts -f latex -P commandprefix=PYG -F tokenmerge -o ${outputPath} ${inputPath}`
      )
    ).toMatchInlineSnapshot(`
"\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
\\\\textcolor[HTML]{FEDE5D}{const}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{FF7EDB}{name}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{FFFFFF}{=}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{FF8B39}{\\"Leandro Facchinettti\\"}\\\\textcolor[HTML]{000000}{;}
\\\\end{Verbatim}
"
`);
  });

  test("with nonexistent theme", () => {
    exec(() => `-S nonexistent -f latex -P commandprefix=PYG`);
    expect(() => {
      exec(
        (inputPath, outputPath) =>
          `-l ts -f latex -P commandprefix=PYG -F tokenmerge -o ${outputPath} ${inputPath}`
      );
    }).toThrowError(/Failed to load theme: nonexistent/);
  });

  test("TeX Live 2015 invocation (see https://github.com/leafac/shiki-latex/issues/1#issuecomment-598209904)", () => {
    expect(
      exec(
        (inputPath, outputPath) =>
          `-l ts -f latex -F tokenmerge -P style=default -P commandprefix=PYGdefault -P style=nord -P commandprefix=PYGnord -P stripnl=False -o ${outputPath} ${inputPath}`
      )
    ).toMatchInlineSnapshot(`
"\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
\\\\textcolor[HTML]{81A1C1}{const}\\\\textcolor[HTML]{D8DEE9}{ }\\\\textcolor[HTML]{D8DEE9}{name}\\\\textcolor[HTML]{D8DEE9}{ }\\\\textcolor[HTML]{81A1C1}{=}\\\\textcolor[HTML]{D8DEE9}{ }\\\\textcolor[HTML]{ECEFF4}{\\"}\\\\textcolor[HTML]{A3BE8C}{Leandro Facchinettti}\\\\textcolor[HTML]{ECEFF4}{\\"}\\\\textcolor[HTML]{81A1C1}{;}
\\\\end{Verbatim}
"
`);
  });
});

function exec(
  commandProducer: (inputPath: string, outputPath: string) => string
): string {
  const temporaryDirectoryPath = fs.mkdtempSync(
    path.join(os.tmpdir(), "shiki-minted-")
  );
  const inputPath = path.join(temporaryDirectoryPath, "input");
  const outputPath = path.join(temporaryDirectoryPath, "output");
  fs.writeFileSync(inputPath, `const name = "Leandro Facchinettti";`);
  const commandOutput = child_process
    .execSync(`node lib/shiki-minted ${commandProducer(inputPath, outputPath)}`)
    .toString();
  return fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, "utf8")
    : commandOutput;
}

afterEach(() => {
  if (fs.existsSync(themePath)) fs.unlinkSync(themePath);
});
