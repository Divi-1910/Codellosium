import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../store/atoms/auth";
import { activeTabState } from "../store/atoms/navigation";
import { LogOut, Code, Trophy, ChevronDown, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setAuth({ user: null, isAuthenticated: false });
    navigate("/login");
  };

  if (location.pathname !== "/home") return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              CodeLLosium
            </motion.div>
          </Link>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                activeTab === "home"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-white/20 backdrop-blur-lg"
              }`}
              onClick={() => setActiveTab("home")}
            >
              <Home className="h-4 w-4" />
              Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                activeTab === "playground"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-white/20 backdrop-blur-lg"
              }`}
              onClick={() => setActiveTab("playground")}
            >
              <Code className="h-4 w-4" />
              Playground
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                activeTab === "arena"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-white/20 backdrop-blur-lg"
              }`}
              onClick={() => setActiveTab("arena")}
            >
              <Trophy className="h-4 w-4" />
              Arena
            </motion.button>
          </div>

          {/* User Profile */}
          <div className="relative">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                {auth.user?.name[0]}
              </div>
              <span className="text-gray-700 font-medium hidden sm:block">
                {auth.user?.name}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </motion.div>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 py-1"
                >
                  <div className="px-4 py-2 border-b border-gray-200/50">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900">
                      {auth.user?.name}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
