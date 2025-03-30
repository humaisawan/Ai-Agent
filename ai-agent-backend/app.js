const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const CustomError = require("./Utils/CustomError");
const globalErrorHandler = require("./Controllers/errorController");

//ImportingRoutes
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

//Initializing Express App
let app = express();

//Initializing Security Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options("*", cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}
app.use(mongoSanitize());
app.use(xssClean());
app.use(helmet());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

//Declaring Routes

app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/messages", messageRoutes);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Cannot find the URL ${req.originalUrl} in the server`,
    500
  );
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
