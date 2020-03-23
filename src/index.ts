import { IThemedToken } from "shiki/dist/themedTokenizer";
import Color from "color";

export interface LaTeXRendererOptions {
  defaultColor?: string;
}

export function renderToLaTeX(
  lines: IThemedToken[][],
  options: LaTeXRendererOptions = {}
) {
  const defaultColor = options.defaultColor ?? "#000000";
  return `\\begin{Verbatim}[commandchars=\\\\\\\{\\\}]
${lines
  .map(line =>
    line
      .map(
        ({ content, color }) =>
          `\\textcolor[HTML]{${Color(color ?? defaultColor)
            .hex()
            .slice(1)}}{${content.replace(
            /[\\{}]/g,
            character =>
              (({ "\\": "\\textbackslash{}", "{": "\\{", "}": "\\}" } as {
                [character: string]: string;
              })[character])
          )}}`
      )
      .join("")
  )
  .join("\n")}
\\end{Verbatim}
`;
}
