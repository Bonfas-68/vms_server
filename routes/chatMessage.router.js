import {
  createMessage,
  deleteMessage,
  getMessages,
  getMessage,
  updateMessage,
} from "../controllers/chatMessage.controller.js";
import { validUser } from "./user.router.js";

export default function chatMessageRouter(app) {
  app
    .route("/api/v1/chat/messages")
    .post(validUser, createMessage)
    .get(validUser, getMessage);

  ///////////////////////////////////////////////////
  //Fetch Messages of a single chat id
  app.route("/api/v1/chat/messages/:chatId").get(validUser, getMessages);

  /////////////////////////////////////////////////////////
  //update and delete a specific message using message id
  app
    .route("/api/v1/chat/messages/:messageId")
    .put(validUser, updateMessage)
    .delete(validUser, deleteMessage);
}
