import {
  addNotificication,
  deleteAllNotifications,
  deleteNotification,
  getNotification,
  getNotifications,
} from "../controllers/notification.controller.js";
import { validUser } from "./user.router.js";

export const notificationRouter = (app) => {
  app
    .route("/api/v1/notify")
    .post(validUser, addNotificication)
    .get(validUser, getNotifications);

  app
    .route("/api/v1/notify/:receiverId")
    .get(validUser, getNotification)
    .delete(validUser, deleteAllNotifications);

  app.route("/api/v1/notify/:id").delete(validUser, deleteNotification);
};
