const express = require("express")
const router = express.Router()
import { signupController } from '../controllers/signupController';
import { signinController } from '../controllers/signincontroller';

//signup
router.post("/signup", signupController );



//sigin 
router.post("/signin",signinController );

module.exports = router;