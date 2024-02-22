import multer from "multer";
import {
  createBlog,
  deleteBlog,
  fetchBlog,
  fetchBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import { validUser } from "./user.router.js";

////////////////////////////////////////
//Middleware for uploading image to the local machine and to the database
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.image);
  },
});

const upload = multer({ storage: storage });

export default function blogRouter(app) {
  app
    .route("/api/v1/blogs")
    .post(upload.single("file"), validUser, createBlog)
    .get(fetchBlogs);

  //Route to access single blog and manipulate it
  app
    .route("/api/v1/blogs/:id")
    .put(validUser, updateBlog)
    .get(validUser, fetchBlog)
    .delete(validUser, deleteBlog);
}
