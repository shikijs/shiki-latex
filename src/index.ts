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
            .slice(1)}}{${content
            .split("")
            .map(
              character =>
                (({ "\\": "\\textbackslash{}", "{": "\\{", "}": "\\}" } as any)[
                  character
                ] ?? character)
            )
            .join("")}}`
      )
      .join("")
  )
  .join("\n")}
\\end{Verbatim}
`;
}
