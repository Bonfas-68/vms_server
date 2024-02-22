import {
  deleteMe,
  getUser,
  getUsers,
  updateMe,
} from "../controllers/user.controller.js";

//Validate User
export const validUser = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ status: "failed", error: "UnAuthorized User" });
  }
};

//User Routes
export default function userRouter(app) {
  app.route("/api/v1/users").get(validUser, getUsers);
  app
    .route("/api/v1/users/:id")
    .get(validUser, getUser)
    .delete(validUser, deleteMe)
    .put(validUser, updateMe);
}
