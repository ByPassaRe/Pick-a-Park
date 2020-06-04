const auth = require("../controllers/auth.js");
const router = require("express").Router();

   
/**
  * @swagger
  * tags:
  *   name: Users
  */

 /**
  * @swagger
  * /auth/:
  *     post:
  *         description: Login
  *         tags: [Auth]
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         properties:
  *                              username:
  *                                  type: string
  *                              password:
  *                                  type: string
  *                     examples:
  *                         Massimo DRIVER:
  *                             value:
  *                                 username: massimo
  *                                 password: massimomassimo
  *         responses:
  *             "200":
  *                 description: Authentication successful
  *             "400":
  *                 description: Wrong Username/Password
  *             "500":
  *                 description: Unexpected error
  */
router.post("/", 
    auth.login);

module.exports = router;

