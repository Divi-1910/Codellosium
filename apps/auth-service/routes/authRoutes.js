import { Router } from "express";
import {
  register,
  login,
  refreshTokenHandler,
  logout
} from "../controllers/authController.js";
import {
  validateLogin,
  validateRegistration
} from "../middlewares/validation.js";

const router = Router();

router.post("/register", validateRegistration, register);

router.post("/login", validateLogin, login);

router.post("/refresh", refreshTokenHandler);

router.post("/logout", logout);

router.get("/health", (req, res) => {
  console.log("reaching auth service");
  res.status(200).json({
    message: "hello from auth service"
  });
});

export default router;
