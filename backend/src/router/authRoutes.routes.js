import { Router } from "express";
import { register, login, logout, updateProfile, checkAuth } from "../controllers/authRoutes.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login)

authRouter.post("/logout", logout)

authRouter.put("/updateprofile",protectRoute, updateProfile)

authRouter.get("/checkauth", protectRoute, checkAuth)


export default authRouter