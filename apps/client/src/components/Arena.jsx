import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./Cards/ThreeDCard";
import { getProblems } from "../api/problem";
import { TypewriterEffectSmooth } from "./texts/TypewriterEffect";
import { useNavigate } from "react-router-dom";

const words = [
  {
    text: "Welcome",
    className: "text-blue-500"
  },
  {
    text: "to",
    className: "text-blue-500"
  },
  {
    text: "CodeLLosium's",
    className: "text-purple-500"
  },
  {
    text: "Arena",
    className: "text-blue-500"
  }
];

const Arena = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const navigate = useNavigate();

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const response = await getProblems();
      setProblems(response);
    } catch (err) {
      console.error("Error fetching problems:", err);
      setError("Failed to load problems. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const filteredProblems =
    selectedDifficulty === "all"
      ? problems
      : problems.filter((problem) => problem.difficulty === selectedDifficulty);

  const handleSolveChallenge = (problemId) => {
    navigate(`/battle/${problemId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="h-[10vh] ml-[15rem] flex items-center justify-center text-center">
          <div className="w-full">
            <TypewriterEffectSmooth
              words={words}
              className="text-center text-4xl font-bold"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {["all", "easy", "medium", "hard"].map((difficulty) => (
            <motion.button
              key={difficulty}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  selectedDifficulty === difficulty
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center"
          >
            {error}
          </motion.div>
        ) : filteredProblems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400"
          >
            No problems available.
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProblems.map((problem, index) => (
                <motion.div
                  key={problem._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <ProblemCard
                    problem={problem}
                    onSolve={handleSolveChallenge}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

const ProblemCard = ({ problem, onSolve }) => {
  const difficultyColors = {
    easy: {
      bg: "bg-gradient-to-r from-green-500/20 via-green-100/20 to-green-500/20",
      text: "text-green-400",
      border: "border-green-500/30",
      button: "from-green-500 to-emerald-600"
    },
    medium: {
      bg: "bg-gradient-to-r from-orange-500/20 via-orange-100/20 to-orange-500/20",
      text: "text-orange-400",
      border: "border-orange-500/30",
      button: "from-orange-500 to-amber-600"
    },
    hard: {
      bg: "bg-gradient-to-r from-red-500/20 via-red-100/20 to-red-500/20",
      text: "text-red-400",
      border: "border-red-500/30",
      button: "from-red-500 to-rose-600"
    }
  };

  return (
    <CardContainer className="inter-var w-full">
      <CardBody
        className="relative group/card w-full h-full rounded-2xl p-6 
        bg-gradient-to-br from-white via-blue-50/50 to-purple-50
        border border-blue-500/10 hover:border-purple-500/50 
        transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20
        backdrop-blur-sm"
      >
        <div
          className="absolute inset-0 h-full w-full bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        />
        <div
          className={`absolute -top-3 right-4 px-4 py-1 rounded-full text-xs font-semibold
            ${difficultyColors[problem.difficulty].bg}
            ${difficultyColors[problem.difficulty].text}
            ${difficultyColors[problem.difficulty].border}
            border backdrop-blur-md
            transform transition-transform duration-300 group-hover:scale-110
            shadow-sm`}
        >
          {problem.difficulty.toUpperCase()}
        </div>
        <CardItem
          translateZ="50"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 bg-clip-text text-transparent"
        >
          {problem.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-gray-400 text-sm leading-relaxed line-clamp-2"
        >
          {problem.description}
        </CardItem>
        <div className="flex gap-2 mt-6">
          <CardItem translateZ="100" className="group/button relative w-full">
            <button
              onClick={() => onSolve(problem._id)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-semibold text-white
              bg-gradient-to-r ${difficultyColors[problem.difficulty].button}
              hover:opacity-90 transition-all duration-300 shadow-lg
              transform hover:-translate-y-0.5`}
            >
              Solve Challenge
              <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover/button:opacity-100 transition-opacity" />
            </button>
          </CardItem>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
        <div
          className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent 
          opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-full blur-2xl"
        />
      </CardBody>
    </CardContainer>
  );
};

export default Arena;
