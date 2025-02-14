import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BorderBeam } from "../background/BorderBeam";
import { Terminal } from "../terminal/Terminal";
import PlayGroundSubmissionTable from "../PlayGroundSubmissionTable";

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

// Reusable component for tab navigation between Input and Output
const PlayGroundTabs = ({
  input,
  output,
  status,
  executionTime,
  onInputChange,
  onRun,
  isRunning
}) => {
  const [activeTab, setActiveTab] = useState("input");

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab("input")}
          className={`px-4 py-2 font-medium ${
            activeTab === "input"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Input
        </button>
        <button
          onClick={() => setActiveTab("output")}
          className={`px-4 py-2 font-medium ${
            activeTab === "output"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Output
        </button>
        <button
          onClick={() => setActiveTab("History")}
          className={`px-4 py-2 font-medium ${
            activeTab === "History"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          History
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        <AnimatePresence>
          {activeTab === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-transparent border border-gray-700 rounded-xl shadow-lg relative p-4"
            >
              <BorderBeam borderWidth={3} />
              <label className="block text-lg font-semibold mb-2 text-gray-800">
                Input
              </label>
              <textarea
                className="w-full h-32 p-3 bg-transparent text-white border border-gray-700 rounded-md resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                value={input}
                onChange={onInputChange}
                placeholder="Enter your input here..."
              />
            </motion.div>
          )}

          {activeTab === "output" && (
            <motion.div
              key="output"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-transparent border border-gray-700 rounded-xl shadow-lg relative p-4 flex flex-col"
            >
              <BorderBeam borderWidth={3} />
              <div className="flex-1 mb-4 h-[500px]">
                <OutputTerminal output={output} status={status} />
              </div>
              <div className="space-y-2 text-right">
                <button
                  onClick={onRun}
                  disabled={isRunning}
                  className={`w-full p-2 rounded-md ${
                    isRunning ? "bg-gray-500" : "bg-blue-500 text-white"
                  } flex items-center justify-center gap-2 font-semibold hover:bg-blue-600 transition-all duration-300`}
                >
                  {isRunning ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
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
                </button>
                {executionTime && (
                  <div className="text-sm text-gray-400">
                    Execution Time: {executionTime} secs
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "History" && <PlayGroundSubmissionTable />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlayGroundTabs;
