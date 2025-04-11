import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProblems } from "../api/problem";
import { executeCodeArena } from "../api/submission";
import CodeEditor from "./Editor/CodeEditor";
import { RetroGrid } from "./background/RetroGrid";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";

const BattleGround = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [executionTime, setExecutionTime] = useState(0);
  const [memoryUsed, setMemoryUsed] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const problems = await getProblems();
        const currentProblem = problems.find((p) => p._id === problemId);
        if (!currentProblem) {
          navigate("/home");
          return;
        }
        setProblem(currentProblem);
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId, navigate]);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setIsSubmitting(true);
    try {
      const startTime = Date.now();
      const response = await executeCodeArena(
        problemId,
        language,
        code,
        "arena"
      );
      const endTime = Date.now();

      setExecutionTime(endTime - startTime);
      setMemoryUsed(response.memory || 0);

      setTestResults(
        problem.testCases.map((testCase) => ({
          input: testCase.input,
          expected: testCase.expectedOutput || testCase.output,
          actual: response.output,
          passed:
            response.output?.trim() ===
            (testCase.expectedOutput || testCase.output)?.trim()
        }))
      );
    } catch (error) {
      setTestResults([{ error: error.message || "Error executing code" }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!problem) return null;

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <RetroGrid />
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 p-4 flex items-center justify-between shadow-sm">
        <button
          onClick={() => navigate("/arena")}
          className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span className="font-medium">Back to Arena</span>
        </button>
        <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {problem.difficulty.charAt(0).toUpperCase() +
            problem.difficulty.slice(1)}
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Problem Section */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-full lg:w-1/2 bg-white p-6 overflow-y-auto border-r border-gray-100"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {problem.title}
          </h1>

          <div className="space-y-6 text-gray-600">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: problem.description }} />
            </div>

            <div className="bg-purple-50/50 p-4 z-50 rounded-xl border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-600 mb-3">
                Examples
              </h3>
              {problem.testCases.slice(0, 2).map((testCase, index) => (
                <div
                  key={index}
                  className="mb-4 p-3 rounded-lg bg-white border border-purple-50"
                >
                  <div className="space-y-2 font-mono">
                    <p className="text-sm">
                      <span className="text-purple-600">Input: </span>
                      <span className="text-gray-700">{testCase.input}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-purple-600">Output: </span>
                      <span className="text-gray-700">
                        {testCase.expectedOutput}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50/50 p-4 z-0 rounded-xl border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Constraints
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-mono text-gray-600">
                {problem.constraints?.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Editor Section */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 mr-2">
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4 flex items-center justify-end">
            <div className="flex space-x-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 mr-2"
              >
                <option value="python">Python</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-700 to-blue-700 text-white 
                  hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-blue-200"
              >
                Submit
              </motion.button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-white">
            <CodeEditor
              code={code}
              language={language}
              onChange={setCode}
              theme="vs"
              className="h-full"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>

          <div className=" border-t border-gray-100 h-64 overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center bg-white justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Test Results
                </h3>
                <div className="text-sm text-gray-500">
                  Time: {executionTime}ms • Memory: {memoryUsed}MB
                </div>
              </div>

              {testResults.map((result, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Case {index + 1}</span>
                    {result.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {!result.passed && (
                    <div className="mt-2 space-y-1 text-sm font-mono">
                      <p className="text-gray-600">Input: {result.input}</p>
                      <p className="text-blue-600">
                        Expected: {result.expected}
                      </p>
                      <p className="text-red-600">
                        Actual: {result.actual || "No output"}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleGround;
