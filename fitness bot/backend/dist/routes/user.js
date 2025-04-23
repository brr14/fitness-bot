"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const signupController_1 = require("../controllers/signupController");
const signincontroller_1 = require("../controllers/signincontroller");
//signup
router.post("/signup", signupController_1.signupController);
//sigin 
router.post("/signin", signincontroller_1.signinController);
module.exports = router;
