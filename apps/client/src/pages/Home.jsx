import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../store/atoms/auth.js";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/Navbar.jsx";
import { activeTabState } from "../store/atoms/navigation";
import { RetroGrid } from "../components/background/RetroGrid.jsx";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan
} from "../components/terminal/Terminal.jsx";
import Playground from "../components/Playground.jsx";
import Arena from "../components/Arena";
import { ColourfulText } from "../components/texts/ColourfulText.jsx";
import { BorderBeam } from "../components/background/BorderBeam.jsx";

const CodeTerminal = ({ user }) => {
  return (
    <Terminal Title="Warrior Terminal" className="relative">
      <BorderBeam />
      <TypingAnimation delay={1000}>
        &gt;Start Writing Code Like A Warrior
      </TypingAnimation>
      <AnimatedSpan delay={2500} className="text-green-500">
        ✔ Preparing Coding Warrior within {user}...
      </AnimatedSpan>
      <AnimatedSpan delay={4500} className="text-green-500">
        ✔ Prepared Code Warrior {user}.
      </AnimatedSpan>
      <AnimatedSpan delay={6500} className="text-green-500">
        ✔ Codellosium Playground ready.
      </AnimatedSpan>
      <AnimatedSpan delay={8500} className="text-green-500">
        ✔ Codellosium Arena ready.
      </AnimatedSpan>
      <AnimatedSpan delay={10500} className="text-green-500">
        ✔ Engaging Code Warrior MindSet .
      </AnimatedSpan>
      <AnimatedSpan delay={12500} className="text-green-500">
        ✔ Engaged Code Warrior MindSet
      </AnimatedSpan>
      <TypingAnimation delay={14000}>
        You Are Now Ready !! Rumble in CodeLLosium
      </TypingAnimation>
    </Terminal>
  );
};

const Home = () => {
  const auth = useRecoilValue(authState);
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="relative overflow-hidden">
        <RetroGrid />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"
          style={{ top: "10%", right: "5%" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"
          style={{ bottom: "10%", left: "5%" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"
          style={{ bottom: "10%", right: "5%" }}
        />
        <div className="mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === "playground" && (
              <motion.div
                key="playground"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Playground />
              </motion.div>
            )}

            {activeTab === "arena" && (
              <motion.div
                key="arena"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Arena />
              </motion.div>
            )}
            {activeTab === "home" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 h-screen py-4"
              >
                <div className="text-center space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl font-bold text-gray-900"
                  >
                    {auth.user && (
                      <div>
                        Welcome <ColourfulText text={auth.user.name} />
                      </div>
                    )}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-600 max-w-2xl mx-auto"
                  >
                    Your journey to becoming a better developer starts here.
                    Explore our interactive playground and join coding
                    challenges.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("playground")}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Hangout In Playground
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("arena")}
                    className="px-8 py-3 bg-white/80 backdrop-blur-xl text-gray-800 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all border border-white/20"
                  >
                    Practice in Arena
                  </motion.button>
                </motion.div>
                <div className="flex justify-center mt-8">
                  <CodeTerminal user={auth.user.name} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;
