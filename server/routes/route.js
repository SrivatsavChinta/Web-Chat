import express from "express";
import { addUser, getUsers } from "../controller/user-controller.js";
import {
  addNewMessage,
  getMessages,
} from "../controller/message-controller.js";
import {
  createConversation,
  getConversation,
  getAllConversations,
} from "../controller/conversation-controller.js";

const route = express.Router();

route.post("/add", addUser);
route.get("/users", getUsers);

route.post("/conversation/add", createConversation);
route.post("/conversation/get", getConversation);
route.post("/conversation/all", getAllConversations);

route.post("/message/add", addNewMessage);
route.get("/message/:id", getMessages);

export default route;
