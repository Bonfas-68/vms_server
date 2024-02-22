import {
  addReviews,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../controllers/reviews.controller.js";
import { validUser } from "./user.router.js";

export default function reviewsRouter(app) {
  app
    .route("/api/v1/reviews")
    .post(validUser, addReviews)
    .get(validUser, getAllReviews);

  app
    .route("/api/v1/reviews/:id")
    .delete(validUser, deleteReview)
    .put(validUser, updateReview);
}
