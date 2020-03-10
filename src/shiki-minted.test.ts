import child_process from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

describe("set theme", () => {
  expect(setTheme("default")).toBe("");
  expect(fs.readFileSync(themePath, "utf-8")).toBe("default");
});

describe("produce LaTeX", () => {
  test("without theme", () => {
    expect(produceLaTeX("ts")).toMatchInlineSnapshot(`
      "\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
      \\\\textcolor[HTML]{0000FF}{const}\\\\textcolor[HTML]{000000}{ }\\\\textcolor[HTML]{001080}{name}\\\\textcolor[HTML]{000000}{ = }\\\\textcolor[HTML]{A31515}{\\"Leandro Facchinettti\\"}\\\\textcolor[HTML]{000000}{;}
      \\\\end{Verbatim}
      "
    `);
  });

  test("with theme", () => {
    setTheme("nord");
    expect(produceLaTeX("ts")).toMatchInlineSnapshot(`
      "\\\\begin{Verbatim}[commandchars=\\\\\\\\\\\\{\\\\}]
      \\\\textcolor[HTML]{81A1C1}{const}\\\\textcolor[HTML]{D8DEE9FF}{ }\\\\textcolor[HTML]{D8DEE9}{name}\\\\textcolor[HTML]{D8DEE9FF}{ }\\\\textcolor[HTML]{81A1C1}{=}\\\\textcolor[HTML]{D8DEE9FF}{ }\\\\textcolor[HTML]{ECEFF4}{\\"}\\\\textcolor[HTML]{A3BE8C}{Leandro Facchinettti}\\\\textcolor[HTML]{ECEFF4}{\\"}\\\\textcolor[HTML]{81A1C1}{;}
      \\\\end{Verbatim}
      "
    `);
  });
});

function setTheme(theme: string): string {
  return child_process
    .execSync(`node lib/shiki-minted -S ${theme} -f latex -P commandprefix=PYG`)
    .toString();
}

function produceLaTeX(language: string): string {
  const temporaryDirectoryPath = fs.mkdtempSync(
    path.join(os.tmpdir(), "shiki-minted-")
  );
  const inputPath = path.join(temporaryDirectoryPath, "input");
  const outputPath = path.join(temporaryDirectoryPath, "output");
  fs.writeFileSync(inputPath, `const name = "Leandro Facchinettti";`);
  child_process.execSync(
    `node lib/shiki-minted -l ${language} -f latex -P commandprefix=PYG -F tokenmerge -o ${outputPath} ${inputPath}`
  );
  return fs.readFileSync(outputPath, "utf-8");
}

afterEach(() => {
  if (fs.existsSync(themePath)) fs.unlinkSync(themePath);
});

const themePath = "shiki-theme.pyg";
