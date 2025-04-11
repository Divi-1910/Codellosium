import { React, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { isAuthenticatedSelector } from "./store/selectors/authSelectors";
import { Toaster, toast } from "react-hot-toast";
import NotificationListener from "./components/Listener/NotificationListener";
import BattleGround from "./components/BattleGround";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please Login Again !! ", {
        id: "auth-error"
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <div>
      <NotificationListener />
      <Toaster position="bottom-right" reverseOrder={true} />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/battle/:problemId"
            element={
              <ProtectedRoute>
                <BattleGround />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
