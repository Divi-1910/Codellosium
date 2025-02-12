import { useState } from "react";
import { useRecoilState } from "recoil";
import { playgroundState } from "../store/atoms/playground";
import CodeEditor from "./Editor/CodeEditor";
import { BorderBeam } from "./background/BorderBeam";
import { Terminal } from "./terminal/Terminal";
import { executeCode } from "../api/submission";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export const OutputTerminal = ({ output, status }) => {
  return (
    <Terminal Title="Output Terminal" className="relative h-full">
      <pre
        className={`text-sm p-2 rounded-md ${
          status === "success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {output || "No Output Yet"}
      </pre>
    </Terminal>
  );
};

const Playground = () => {
  const [state, setState] = useRecoilState(playgroundState);
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (newCode) => {
    setState((prev) => ({ ...prev, code: newCode }));
  };

  const handleLanguageChange = (newLanguage) => {
    setState((prev) => ({ ...prev, language: newLanguage }));
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const result = await executeCode(
        state.code,
        state.language,
        state.input,
        "playground"
      );
      setState((prev) => ({
        ...prev,
        output: result.output,
        status: result.success ? "success" : "error",
        executionTime: result.executionTime || "N/A"
      }));
    } catch (error) {
      console.log("error is :", error);
      setState((prev) => ({
        ...prev,
        output: error.message,
        status: "error"
      }));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-6rem)] p-6 text-white">
      {/* Code Editor Section */}
      <div className="w-3/5 border border-gray-700 rounded-xl shadow-lg relative overflow-hidden">
        <BorderBeam borderWidth={50} size={750} />
        <div className="h-full rounded-xl p-2">
          <CodeEditor
            code={state.code}
            language={state.language}
            onCodeChange={handleCodeChange}
            onLanguageChange={handleLanguageChange}
            onCodeRun={handleRun}
            className="h-full"
          />
        </div>
      </div>

      {/* Input/Output Section */}
      <div className="w-2/5 flex flex-col gap-4">
        {/* Input Panel */}
        <div className="bg-transparent border border-gray-700 rounded-xl shadow-lg relative p-4">
          <BorderBeam borderWidth={3} />
          <label className="block text-lg font-semibold mb-2 text-gray-800">
            Input
          </label>
          <CustomTextArea
            value={state.input}
            onChange={(e) =>
              setState((prev) => ({ ...prev, input: e.target.value }))
            }
            placeholder="Enter your input here..."
          />
        </div>

        <div className="flex-1 bg-transparent border border-gray-700 rounded-xl shadow-lg relative p-4">
          <BorderBeam borderWidth={3} />
          <div className="flex flex-col h-full">
            <div className="flex-1 mb-4 min-h-[200px]">
              <OutputTerminal output={state.output} status={state.status} />
            </div>
            <div className="space-y-2 text-right">
              <RunButton onClick={handleRun} isRunning={isRunning} />
              {state.executionTime && (
                <div className="text-sm text-gray-400">
                  Execution Time: {state.executionTime} secs
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomTextArea = ({ value, onChange }) => (
  <textarea
    className="w-full h-32 p-3 bg-transparent text-white border border-gray-700 rounded-md resize-none focus:ring-2 focus:ring-blue-500 outline-none"
    value={value}
    onChange={onChange}
    placeholder="Enter input here..."
  />
);

const RunButton = ({ onClick, isRunning }) => (
  <motion.button
    className="w-full p-2 rounded-md bg-blue-500 text-white flex items-center justify-center gap-2 font-semibold hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-500"
    onClick={onClick}
    disabled={isRunning}
    whileHover={{ scale: isRunning ? 1 : 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {isRunning ? (
      <>
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Running...
      </>
    ) : (
      "Run Code"
    )}
  </motion.button>
);

export default Playground;
