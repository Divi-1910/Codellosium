import React from "react";
import { RetroGrid } from "../components/background/RetroGrid";
import SparklesText from "../components/texts/SparklesText";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <RetroGrid className="z-0" angle={65} cellSize={60} opacity={1} />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="mb-20">
          <SparklesText text="Codellosium" />
        </div>

        <div className="flex gap-16">
          <div
            onClick={() => navigate("/register")}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
            <div className="relative flex h-[300px] w-[250px] flex-col items-center justify-center rounded-lg bg-black px-6 py-8 leading-none">
              <div className="mb-4 text-7xl">🚀</div>
              <h3 className="mb-2 text-3xl font-bold text-purple-400">
                Register
              </h3>
              <p className="text-center text-gray-300">
                Begin your journey in the arena
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate("/login")}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
            <div className="relative flex h-[300px] w-[250px] flex-col items-center justify-center rounded-lg bg-black px-6 py-8 leading-none">
              <div className="mb-4 text-7xl">⚔️</div>
              <h3 className="mb-2 text-3xl font-bold text-cyan-400">Login</h3>
              <p className="text-center text-gray-300">
                Return to the battlefield
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
