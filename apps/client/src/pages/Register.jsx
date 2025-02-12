import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { RetroGrid } from "../components/background/RetroGrid";
import { useSetRecoilState } from "recoil";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { authState } from "../store/atoms/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await registerUser(form);
      setAuth({
        user: { _id: data._id, name: data.name, email: data.email },
        accessToken: data.accessToken,
        isAuthenticated: true
      });
      navigate("/home");
    } catch (err) {
      setError(err.error || "Registration failed");
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
      <RetroGrid className="z-0" angle={65} cellSize={60} opacity={0.8} />

      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"
        style={{ top: "10%", right: "15%" }}
      />
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
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Gradient border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-gray-600">Join our community today</p>
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
              {/* Input fields with animations */}
              {[
                {
                  icon: FiUser,
                  name: "name",
                  placeholder: "Full Name",
                  type: "text"
                },
                {
                  icon: FiMail,
                  name: "email",
                  placeholder: "Email Address",
                  type: "email"
                },
                {
                  icon: FiLock,
                  name: "password",
                  placeholder: "Password",
                  type: "password"
                }
              ].map((field) => (
                <motion.div
                  key={field.name}
                  variants={inputVariants}
                  whileFocus="focus"
                  whileHover={{ scale: 1.01 }}
                  className="relative"
                >
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                </motion.div>
              ))}

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
                    <span>Create Account</span>
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-gray-600 text-sm"
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Login
                </Link>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center text-sm"
        >
          {[
            { icon: "🔒", text: "Secure" },
            { icon: "⚡", text: "Fast" },
            { icon: "🛡️", text: "Protected" }
          ].map((feature) => (
            <motion.div
              key={feature.text}
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-lg bg-white/50 backdrop-blur-sm"
            >
              <span className="text-xl mb-1 block">{feature.icon}</span>
              <span className="text-gray-600">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
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
    </div>
  );
};

export default Register;
