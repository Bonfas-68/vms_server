import multer from "multer";
import {
  deleteSample,
  getSample,
  getSamples,
  updateSample,
  uploadSamples,
} from "../controllers/sample.controller.js";
import { validUser } from "./user.router.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.sample_image);
  },
});

const upload = multer({ storage: storage });

export default function sampleProductRouter(app) {
  app
    .route("/api/v1/samples/register")
    .post(validUser, upload.single("file"), uploadSamples);

  app.route("/api/v1/samples").get(validUser, getSamples);

  app
    .route("/api/v1/samples/:id")
    .get(validUser, getSample)
    .delete(validUser, deleteSample)
    .put(validUser, updateSample);
}
