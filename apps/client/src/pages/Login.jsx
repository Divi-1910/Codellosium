import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { RetroGrid } from "../components/background/RetroGrid";
import { useSetRecoilState } from "recoil";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { authState } from "../store/atoms/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(form);
      setAuth({
        user: { _id: data._id, name: data.name, email: data.email },
        accessToken: data.accessToken,
        isAuthenticated: true
      });
      navigate("/home");
    } catch (err) {
      setError(err.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 overflow-hidden">
      <RetroGrid className="z-100" angle={65} cellSize={60} opacity={0.8} />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
        style={{ bottom: "10%", left: "15%" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-600">Login to your account</p>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 flex items-center"
                >
                  <span className="text-lg mr-2">⚠️</span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover={{ scale: 1.01 }}
                className="relative"
              >
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  required
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover={{ scale: 1.01 }}
                className="relative"
              >
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </motion.button>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <span>Login</span>
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-gray-600 text-sm"
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Create Account
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 right-20 w-20 h-20 bg-purple-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"
        />
      </motion.div>
    </div>
  );
};

export default Login;
