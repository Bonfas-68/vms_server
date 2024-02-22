import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import config from "./db/config.js";
import businessRouter from "./routes/business.router.js";
import userRouter from "./routes/user.router.js";
import postRouter from "./routes/post.router.js";
import authRouter from "./routes/auth.router.js";
import commentRouter from "./routes/comment.router.js";
import blogRouter from "./routes/blog.router.js";
import sampleProductRouter from "./routes/sample.router.js";
import productsRouter from "./routes/product.router.js";
import likesRouter from "./routes/likes.router.js";
import connectRouter from "./routes/connect.router.js";
import conversationsRouter from "./routes/conversations.router.js";
import chatMessageRouter from "./routes/chatMessage.router.js";
import searchRoutes from "./routes/search.router.js";
import { notificationRouter } from "./routes/notification.router.js";
import newsRouter from "./routes/news.router.js";
import paymentRouter from "./routes/payment.router.js";
import reviewsRouter from "./routes/reviews.router.js";
import planRouter from "./routes/plans.router.js";

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.static("public"));
//Authentication Middleware -- Applies to any route and to the one that uses validUser middleware function that is used to validate any operation for authenticated user
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "CHATCON"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwt_secret,
      (err, decode) => {
        if (err) res.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

//Routes pass app to be used in the routes to initiate specific routes
businessRouter(app);
userRouter(app);
postRouter(app);
authRouter(app);
commentRouter(app);
blogRouter(app);
sampleProductRouter(app);
productsRouter(app);
likesRouter(app);
connectRouter(app);
conversationsRouter(app);
chatMessageRouter(app);
searchRoutes(app);
notificationRouter(app);
newsRouter(app);
paymentRouter(app);
reviewsRouter(app);
planRouter(app);

//Home Route
app.get("/", (req, res) => {
  res.json("Hello server");
});
