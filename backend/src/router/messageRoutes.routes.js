import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages, searchUser, sendMessage } from "../controllers/message.controller.js";
const messageRouter = Router();


messageRouter.get("/users", protectRoute, getAllUsers);
messageRouter.post("/searchuser", protectRoute, searchUser);
messageRouter.get("/getmessages/:id", protectRoute, getMessages);
messageRouter.post("/sendmessages/:id", protectRoute, sendMessage)
export default messageRouter