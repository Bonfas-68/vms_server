import {
  clearConversations,
  createConversation,
  getConversation,
  getConversationChats,
  getConversations,
} from "../controllers/conversation.controller.js";
import { validUser } from "./user.router.js";

export default function conversationsRouter(app) {
  //////////////////////////////////////////////////////
  ///Route to fetch for and create chats
  app
    .route("/api/v1/chat/conversations")
    .post(validUser, createConversation)
    .get(validUser, getConversations);

  //////////////////////////////////////////////////////
  ///Route to fetch for chats I have created
  app
    .route("/api/v1/chat/conversations/:senderId/")
    .get(validUser, getConversation);

  //////////////////////////////////////////////////////
  ///Route to get a chat and  delete specific one
  app
    .route("/api/v1/chat/conversations/:chatId")
    .delete(validUser, clearConversations)
    .get(validUser, getConversationChats);
}
