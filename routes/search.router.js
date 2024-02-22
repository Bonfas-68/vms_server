import {
  fetchAllSearch,
  search,
  storeUserSearch,
} from "../controllers/search.controller.js";
import { validUser } from "./user.router.js";

const searchRoutes = (app) => {
  // Used params coz I found it working better for me rather than using req.body or req.query
  app.route("/api/v1/search/:search").get(validUser, search);

  app
    .route("/api/v1/search")
    .post(validUser, storeUserSearch)
    .get(validUser, fetchAllSearch);
};

export default searchRoutes;
