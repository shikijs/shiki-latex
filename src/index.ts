import { IThemedToken } from "shiki/dist/themedTokenizer";

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
          `\\textcolor[HTML]{${(color ?? defaultColor).slice(1)}}{${content
            .replace(/\\/g, "\\\\")
            .replace(/\{/g, "\\{")
            .replace(/\}/g, "\\}")}}`
      )
      .join("")
  )
  .join("\n")}
\\end{Verbatim}
`;
}
