import {
  creatConnect,
  getConnected,
  deleteConnect,
  getMyConnection,
  updateConnect,
} from "../controllers/connect.controller.js";
import { validUser } from "./user.router.js";

export default function connectRouter(app) {
  app
    .route("/api/v1/business_connect")
    .post(validUser, creatConnect)
    .get(validUser, getConnected);

  //////////////////////////////////////////////////////
  ///Route to fetch where I have connect to, delete it and update it
  app
    .route("/api/v1/business_connect/:connecting_user_id")
    .put(validUser, updateConnect)
    .delete(validUser, deleteConnect)
    .get(validUser, getMyConnection);
}
