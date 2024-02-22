import {
  createUserPlan,
  getPlans,
  getUserPlans,
  planSurvey,
  surveyPlans,
} from "../controllers/plans.controller.js";
import { validUser } from "./user.router.js";

export default function planRouter(app) {
  app.route("/api/v1/plans").get(getPlans).post(validUser, planSurvey);

  app
    .route("/api/v1/user_plans")
    .post(validUser, createUserPlan)
    .get(validUser, getUserPlans);

  app.route("/api/v1/surveys").get(validUser, surveyPlans);
}
