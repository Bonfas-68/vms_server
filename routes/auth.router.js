import { signin, signup } from "../controllers/auth.controller.js";
import multer from "multer";

// Middleware for uploading images from frontend to backend local route and then to database
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.user_avatar);
  },
});

const upload = multer({ storage: storage });

export default function authRouter(app) {
  app.route("/api/v1/users/signup").post(upload.single("file"), signup);
  app.route("/api/v1/users/signin").post(signin);
}
