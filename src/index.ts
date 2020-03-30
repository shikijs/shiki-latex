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
  const fancyvrbOptions = ["commandchars=\\\\\\{\\}"];
  const characterEscapes: { [character: string]: string } = {
    "\\": "\\textbackslash{}",
    "{": "\\{",
    "}": "\\}"
  };
  const renderedLines = lines
    .map(line =>
      line
        .map(({ content, color }) => {
          const normalizedColor = Color(color ?? defaultColor)
            .hex()
            .slice(1);
          const escapedContent = content
            .split("")
            .map(character => characterEscapes[character] ?? character)
            .join("");
          return `\\textcolor[HTML]{${normalizedColor}}{${escapedContent}}`;
        })
        .join("")
    )
    .join("\n");
  return `\\begin{Verbatim}[${fancyvrbOptions.join(",")}]
${renderedLines}
\\end{Verbatim}
`;
}
