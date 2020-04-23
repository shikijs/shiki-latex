import { IThemedToken } from "shiki/dist/themedTokenizer";
import Color from "color";

export interface LaTeXRendererOptions {
  defaultColor?: string;
  mathescape?: boolean;
}

export function renderToLaTeX(
  lines: IThemedToken[][],
  options: LaTeXRendererOptions = {}
) {
  const defaultColor = options.defaultColor ?? "#000000";
  const fancyvrbOptions = ["commandchars=\\\\\\{\\}"];
  if (options.mathescape)
    fancyvrbOptions.push(
      "codes={\\catcode`\\$=3\\catcode`\\^=7\\catcode`\\_=8}"
    );
  const characterEscapes: { [character: string]: string } = {
    "\\": "\\textbackslash{}",
    "{": "\\{",
    "}": "\\}",
    ...(options.mathescape ? { "^": "\\^", _: "\\_" } : {}),
  };
  const renderedLines = lines
    .map((line) =>
      line
        .map(({ content, color, preserveFontStyle, fontStyle }) => {
          const normalizedColor = Color(color ?? defaultColor)
            .hex()
            .slice(1);
          const escapedContent = content
            .split("$")
            .map((contentFragment, contentFragmentIndex) => {
              return options.mathescape && contentFragmentIndex % 2 === 1
                ? contentFragment
                : contentFragment
                    .split("")
                    .map(
                      (character) => characterEscapes[character] ?? character
                    )
                    .join("");
            })
            .join("$");
          var fontStyleStr:string = "";
          var fontStyleStr2:string = "";
          if (preserveFontStyle && fontStyle == `font-weight: bold`)
              fontStyleStr2 +=  `\\bfseries`;
          if (preserveFontStyle && fontStyle == `font-style: italic;`)
              fontStyleStr2 +=  `\\itshape`;
          if (preserveFontStyle && fontStyle == `text-decoration: underline`)
              fontStyleStr = `\\underline`;
          return `${fontStyleStr}{${fontStyleStr2}\\textcolor[HTML]{${normalizedColor}}{${escapedContent}}}`;
        })
        .join("")
    )
    .join("\n");
  return `\\begin{Verbatim}[${fancyvrbOptions.join(",")}]
${renderedLines}
\\end{Verbatim}
`;
}
