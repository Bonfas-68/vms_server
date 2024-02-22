import {
  createPost,
  deletePost,
  fetchPost,
  fetchPosts,
  updatePost,
} from "../controllers/post.controller.js";
import multer from "multer";
import { validUser } from "./user.router.js";

//For uploading single image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.image);
  },
});

const upload = multer({ storage: storage });
export default function postRouter(app) {
  app
    .route("/api/v1/posts/create")
    .post(validUser, upload.single("file"), createPost);

  app.route("/api/v1/posts").get(validUser, fetchPosts);

  app
    .route("/api/v1/posts/:id")
    .get(validUser, fetchPost)
    .put(validUser, upload.single("file"), updatePost)
    .delete(validUser, deletePost);
}
