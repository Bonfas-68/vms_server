import multer from "multer";
import {
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  uploadProduct,
} from "../controllers/product.controller.js";
import { validUser } from "./user.router.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.product_image);
  },
});
const upload = multer({ storage: storage });

export default function productsRouter(app) {
  app
    .route("/api/v1/products/register")
    .post(validUser, upload.single("file"), uploadProduct);
  app.route("/api/v1/products").get(validUser, getProducts);
  app
    .route("/api/v1/products/:id")
    .get(validUser, getProduct)
    .delete(validUser, deleteProduct)
    .put(validUser, upload.single("file"), updateProduct);
}
