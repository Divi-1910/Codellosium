import { useState } from "react";
import { useRecoilState } from "recoil";
import { playgroundState } from "../store/atoms/playground";
import CodeEditor from "./Editor/CodeEditor";
import { BorderBeam } from "./background/BorderBeam";
import { executeCode } from "../api/submission";
import PlaygroundTabs from "./Tabs/PlayGroundTabs";
import SubmissionTable from "./PlayGroundSubmissionTable";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

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
      console.error("Run error:", error);
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
    <div className="flex gap-6 h-[calc(100vh-6rem)] p-4 text-white">
      {/* Code Editor Section */}
      <div className="w-3/5 border border-gray-700 rounded-xl shadow-lg bg-slate-50 relative overflow-hidden">
        <BorderBeam borderWidth={50} size={750} />
        <div className="h-full p-3 rounded-xl relative">
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

      <PlaygroundTabs
        input={state.input}
        output={state.output}
        status={state.status}
        executionTime={state.executionTime}
        isRunning={isRunning}
        onInputChange={(e) =>
          setState((prev) => ({ ...prev, input: e.target.value }))
        }
        onRun={handleRun}
        className="relative"
      />
    </div>
  );
};

export default Playground;
