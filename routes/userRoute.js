const express = require("express");
const userController = require("../controller/userCtrl");

const userRouter = express.Router();

// register route
userRouter.post("/api/v1/register", userController.register);

// login Route
userRouter.post("/api/v1/login", userController.login);

module.exports = userRouter