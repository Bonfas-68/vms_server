import multer from "multer";
import {
  deleteBusiness,
  getBusiness,
  getBusinesses,
  getSearchedBusinesses,
  registerBusiness,
  updateBusiness,
  updateBusinessLogo,
  updateBusinessimage,
} from "../controllers/business.controller.js";
import { validUser } from "./user.router.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.b_image);
  },
});
const upload = multer({ storage: storage });
const storageLogo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.b_logo);
  },
});
const uploadLogo = multer({ storage: storageLogo });

export default function businessRouter(app) {
  app.route("/api/v1/businesses?b_name").get(validUser, getSearchedBusinesses);
  app.route("/api/v1/businesses").get(validUser, getBusinesses);

  app
    .route("/api/v1/businesses/register")
    .post(validUser, upload.single("file"), registerBusiness);

  ////////////////////////////
  //Route for updating, fetching, deleting a specific business and also uploading its logo and updating its image
  app
    .route("/api/v1/businesses/:id")
    .get(validUser, getBusiness)
    .put(validUser, updateBusiness)
    .patch(validUser, uploadLogo.single("file"), updateBusinessLogo)
    .delete(validUser, deleteBusiness)
    .patch(validUser, upload.single("file"), updateBusinessimage);
}
