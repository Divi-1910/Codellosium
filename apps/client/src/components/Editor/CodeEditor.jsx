import { useState, useEffect, useRef, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { useResizable } from "react-resizable-layout";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../shadCN/Select";
import { Button } from "../shadCN/Button";
import { useRecoilState } from "recoil";
import { editorThemeState } from "../../store/atoms/editor";

const CodeEditor = ({
  code: propCode,
  language: propLanguage,
  onCodeChange,
  onLanguageChange,
  onCodeRun,
  readOnly = false,
  className
}) => {
  const [code, setCode] = useState(propCode);
  const [selectedLanguage, setSelectedLanguage] = useState(propLanguage);
  const [editorTheme, setEditorTheme] = useRecoilState(editorThemeState);
  const [isProcessing, setIsProcessing] = useState(false);
  const editorRef = useRef(null);

  const SUPPORTED_LANGUAGES = useMemo(
    () => [{ id: "python", name: "Python", monacoLang: "python", icon: "🐍" }],
    []
  );

  useEffect(() => {
    setCode(propCode);
  }, [propCode]);

  useEffect(() => {
    setSelectedLanguage(propLanguage);
  }, [propLanguage]);

  const handleChange = (value) => {
    setCode(value);
    onCodeChange?.(value);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [selectedLanguage]);

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955" },
        { token: "keyword", foreground: "569CD6" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
        { token: "regexp", foreground: "D16969" },
        { token: "type", foreground: "4EC9B0" },
        { token: "class", foreground: "4EC9B0" },
        { token: "function", foreground: "DCDCAA" },
        { token: "variable", foreground: "9CDCFE" },
        { token: "constant", foreground: "4FC1FF" }
      ],
      colors: {
        "editor.background": "#0B1120",
        "editor.foreground": "#D4D4D4",
        "editor.lineHighlightBackground": "#1E293B",
        "editor.selectionBackground": "#264F78",
        "editor.inactiveSelectionBackground": "#3A3D41"
      }
    });
    monaco.editor.setTheme("custom-dark");

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRunCode();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      toast.success("Code saved!");
    });

    editor.addAction({
      id: "run-code",
      label: "Run Code",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: handleRunCode
    });

    editor.updateOptions({
      fontFamily: "'Fira Code', monospace",
      fontLigatures: true,
      fontSize: 14,
      lineHeight: 1.5,
      padding: { top: 10, bottom: 10 },
      minimap: { enabled: true, scale: 10, renderCharacters: false },
      automaticLayout: true,
      wordWrap: "on",
      wrappingIndent: "indent"
    });

    toast.success("Editor ready!", { icon: "🚀", duration: 1000 });
  };

  const handleRunCode = async () => {
    setIsProcessing(true);
    try {
      await onCodeRun?.(code, selectedLanguage);
    } catch (error) {
      toast.error(`Execution failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (error) {
      toast.error(`Copy failed: ${error.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex h-[85vh] bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900",
        "rounded-xl border border-blue-500/20 shadow-2xl ",
        "backdrop-blur-xl backdrop-filter",
        "ring-1 ring-blue-500/20 ring-offset-2 ring-offset-blue-100/5",
        className
      )}
    >
      <div className="flex-1 flex flex-col relative">
        <div className="flex items-center justify-between p-4 bg-gray-900/50 border-b rounded-xl border-blue-500/20 backdrop-blur-md">
          <div className="flex items-center gap-4 text-white m-2">
            {" "}
            <Select
              value={selectedLanguage}
              onValueChange={(value) => {
                setSelectedLanguage(value);
                onLanguageChange?.(value);
              }}
            >
              <SelectTrigger className="w-[180px] bg-gray-800/50 border-blue-500/30 hover:border-blue-400/50 transition-all duration-200">
                <div className="flex items-center gap-2">
                  {
                    SUPPORTED_LANGUAGES.find((l) => l.id === selectedLanguage)
                      ?.icon
                  }
                  <SelectValue
                    placeholder="Select language"
                    className="text-gray-200"
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-blue-500/30">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem
                    key={lang.id}
                    value={lang.id}
                    className="text-gray-200 hover:bg-blue-600/20 focus:bg-blue-600/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setEditorTheme((prev) =>
                  prev === "custom-dark" ? "vs-light" : "custom-dark"
                )
              }
              className={cn(
                "px-4 py-2 rounded-lg transition-all duration-200",
                "bg-gray-800/50 hover:bg-gray-700/50",
                "border border-blue-500/30 hover:border-blue-400/50",
                "text-gray-200 hover:text-white",
                "flex items-center gap-2"
              )}
            >
              {editorTheme === "custom-dark" ? <>🌙 Dark</> : <>☀️ Light</>}
            </Button>
          </div>

          <h2 className="text-xl text-white pr-8">Editor</h2>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCode}
              disabled={isProcessing}
              className={cn(
                "px-4 py-2 rounded-lg transition-all duration-200",
                "bg-gray-800/50 hover:bg-gray-700/50",
                "border border-blue-500/30 hover:border-blue-400/50",
                "text-gray-200 hover:text-white",
                "flex items-center gap-2"
              )}
            >
              📋 Copy
            </Button>
          </div>
        </div>

        <div className="flex-1 relative ">
          <Editor
            height="99%"
            defaultLanguage={selectedLanguage}
            language={
              SUPPORTED_LANGUAGES.find((l) => l.id === selectedLanguage)
                ?.monacoLang
            }
            theme={editorTheme}
            value={code}
            onChange={handleChange}
            options={{
              minimap: { enabled: true, scale: 7, renderCharacters: true },
              fontSize: 14,
              fontFamily: "'Fira Code', monospace",
              fontLigatures: true,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              readOnly,
              automaticLayout: true,
              formatOnPaste: true,
              formatOnType: true,
              wordWrap: "on",
              wrappingIndent: "indent",
              padding: { top: 10 },
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: true,
              bracketPairColorization: { enabled: true }
            }}
            placeholder="Start Writing Code here ..."
            onMount={handleEditorMount}
          />
        </div>
      </div>
      <div />
    </motion.div>
  );
};

export default CodeEditor;
