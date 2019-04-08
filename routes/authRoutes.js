//@ts-check
const { Router } = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");
const User = require("../model/User");

const router = Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

module.exports = router;
