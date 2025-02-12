import React from "react";

const Hero = () => {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {auth.user ? (
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {auth.user.name[0]}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Welcome back, {auth.user.name}!
                </h1>
                <p className="text-gray-400 mt-2">
                  Ready to code something amazing?
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-4xl font-bold text-white">
              Welcome to CodeHub
            </h1>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div
              className="p-6 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCode className="text-4xl text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Start Coding
              </h3>
              <p className="text-gray-300">
                Jump into our interactive playground and start coding right
                away.
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaRocket className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Join Challenges
              </h3>
              <p className="text-gray-300">
                Compete with others and improve your skills in our coding arena.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
