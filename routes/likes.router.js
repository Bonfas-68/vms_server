import {
  createBlogLike,
  createBusinessLike,
  createNewsLike,
  createPostLike,
  createProductLike,
  deleteBlogsLike,
  deleteBusinessLike,
  deletePostLike,
  deleteProductLike,
  getBlogsLikes,
  getBusinessLikes,
  getNewsLikes,
  getPostsLikes,
  getProductsLikes,
  updateBlogLikes,
  updateBusinessLikes,
  updateNewsLikes,
  updatePostLikes,
  updateProductLikes,
} from "../controllers/likes.controller.js";
import { validUser } from "./user.router.js";

export default function likesRouter(app) {
  //////////////////////////////////////////////////////
  ///Business Likes routes
  app
    .route(`/api/v1/business_likes`)
    .post(validUser, createBusinessLike)
    .get(validUser, getBusinessLikes);

  app
    .route(`/api/v1/business_likes/:id`)
    .delete(validUser, deleteBusinessLike)
    .put(validUser, updateBusinessLikes);

  //////////////////////////////////////////////////////
  ///Posts Likes routes
  app
    .route(`/api/v1/posts_likes`)
    .post(validUser, createPostLike)
    .get(validUser, getPostsLikes);

  app
    .route(`/api/v1/posts_likes/:id`)
    .delete(validUser, deletePostLike)
    .put(validUser, updatePostLikes);

  //////////////////////////////////////////////////////
  ///Products Likes routes
  app
    .route(`/api/v1/products_likes`)
    .post(validUser, createProductLike)
    .get(validUser, getProductsLikes);

  app
    .route(`/api/v1/products_likes/:id`)
    .delete(validUser, deleteProductLike)
    .put(validUser, updateProductLikes);

  //////////////////////////////////////////////////////
  ///News Likes routes
  app
    .route(`/api/v1/news_likes`)
    .post(validUser, createNewsLike)
    .get(validUser, getNewsLikes);

  app.route(`/api/v1/news_likes/:id`).put(validUser, updateNewsLikes);

  //////////////////////////////////////////////////////
  ///Blogs Likes routes
  app
    .route(`/api/v1/blogs_likes`)
    .post(validUser, createBlogLike)
    .get(validUser, getBlogsLikes);
  app
    .route(`/api/v1/blogs_likes/:id`)
    .put(validUser, updateBlogLikes)
    .delete(validUser, deleteBlogsLike);
}
