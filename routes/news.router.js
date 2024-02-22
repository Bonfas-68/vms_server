import multer from "multer";
import {
  deleteNews,
  fetchNews,
  getNews,
  reportNews,
  updateNews,
} from "../controllers/news.controller.js";
import { validUser } from "./user.router.js";
//For uploading single image to the database and the local machine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.news_image);
  },
});
const upload = multer({ storage: storage });

export default function newsRouter(app) {
  app
    .route("/api/v1/marketnews")
    .get(fetchNews)
    .post(validUser, upload.single("file"), reportNews);

  app
    .route("/api/v1/marketnews/:news_id")
    .put(validUser, upload.single("file"), updateNews)
    .delete(validUser, deleteNews)
    .get(validUser, getNews);
}
