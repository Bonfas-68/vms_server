import {
  createOrder,
  deleteOrder,
  getOrders,
} from "../controllers/payment.controller.js";

import { validUser } from "./user.router.js";

export default function paymentRouter(app) {
  // orders
  app
    .route("/api/v1/orders")
    .post(validUser, createOrder)
    .get(validUser, getOrders);
  app.route("/api/v1/orders/:orderId").delete(validUser, deleteOrder);
}
