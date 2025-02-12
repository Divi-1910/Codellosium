import { format } from "prettier";
import parserPython from "prettier/parser-python";
import parserBabel from "prettier/parser-babel";

export const formatCode = async (code, language) => {
  const parser = language === "python" ? "python" : "babel";
  const plugins = language === "python" ? [parserPython] : [parserBabel];

  return format(code, {
    parser,
    plugins,
    singleQuote: true,
    trailingComma: "all"
  });
};
