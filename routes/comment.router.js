import {
  createBlogsComment,
  createBusinessComment,
  createNewsComment,
  createPostsComment,
  createProductsComment,
  createSamplesComment,
  fetchBlogsComments,
  fetchBusinessComments,
  fetchNewsComments,
  fetchPostsComments,
  fetchProductComments,
  fetchSampleComments,
  updateBlogsComment,
  updateBusinessComment,
  updateNewsComment,
  updatePostsComment,
  updateProductsComment,
} from "../controllers/comment.controller.js";
import { validUser } from "./user.router.js";

export default function commentRouter(app) {
  //////////////////////////////////////////////////////
  ///Separated routes for specific table of comment creation
  app
    .route("/api/v1/business_comments/create")
    .post(validUser, createBusinessComment);
  app
    .route("/api/v1/products_comments/create")
    .post(validUser, createProductsComment);
  app
    .route("/api/v1/samples_comments/create")
    .post(validUser, createSamplesComment);
  app
    .route("/api/v1/posts_comments/create")
    .post(validUser, createPostsComment);

  // News Comments Routes
  app
    .route("/api/v1/news_comments")
    .post(validUser, createNewsComment)
    .get(validUser, fetchNewsComments);

  app.route("/api/v1/news_comments/:id").put(validUser, updateNewsComment);

  // Blogs Comments Routes
  app
    .route("/api/v1/blogs_comments")
    .post(validUser, createBlogsComment)
    .get(validUser, fetchBlogsComments);

  app.route("/api/v1/blogs_comments/:id").put(validUser, updateBlogsComment);
  app.route("/api/v1/posts_comments/:id").put(validUser, updatePostsComment);
  app
    .route("/api/v1/business_comments/:id")
    .put(validUser, updateBusinessComment);
  app
    .route("/api/v1/products_comments/:id")
    .put(validUser, updateProductsComment);

  // Fetching Routes
  app.route("/api/v1/business_comments").get(validUser, fetchBusinessComments);
  app.route("/api/v1/products_comments").get(validUser, fetchProductComments);
  app.route("/api/v1/samples_comments").get(validUser, fetchSampleComments);
  app.route("/api/v1/posts_comments").get(validUser, fetchPostsComments);
}
