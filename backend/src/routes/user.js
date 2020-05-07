      
const users = require("../controllers/user.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");
 /**
  * @swagger
  * tags:
  *   name: Users
  */
 /**
  * @swagger
  *     components:
  *         schemas:
  *             User:
  *                 description: A JSON object containing User information
  *                 properties:
  *                     email:
  *                         type: string
  *                     username:
  *                         type: string
  *                     password:
  *                         type: string
  *                     role:
  *                         type: string
  *                         enum:
  *                             - DRIVER
  *                             - MUNICIPALITY_EMPLOYEE
  *                             - MUNICIPALITY_POLICE
  *                             - PARKING_COMPANY    
  *         securitySchemes:
  *             bearerAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: Authorization
  */

 /**
  * @swagger
  * /users/:
  *     post:
  *         description: Create an user
  *         tags: [Users]
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         $ref: '#/components/schemas/User'
  *                     examples:
  *                         Massimo DRIVER:
  *                             value:
  *                                 email: massimo@test.it
  *                                 username: massimo
  *                                 password: massimomassimo
  *                                 role: DRIVER
  *                         Ludovico PARKING_COMPANY:
  *                             value:
  *                                 email: ludovico@test.it
  *                                 username: ludovico
  *                                 password: ludovicoludovico
  *                                 role: PARKING_COMPANY
  *                         Carlo MUNICIPALITY_EMPLOYEE:
  *                             value:
  *                                 email: carlo@test.it
  *                                 username: carlo
  *                                 password: carlocarlo
  *                                 role: MUNICIPALITY_EMPLOYEE
  *                         Gennaro MUNICIPALITY_POLICE:
  *                             value:
  *                                 email: gennaro@test.it
  *                                 username: gennaro
  *                                 password: gennarogennaro
  *                                 role: MUNICIPALITY_POLICE
  *         responses:
  *             "200":
  *                 description: An array of user info (password hashed)
  *             "400":
  *                 description: Unexpected error
  */
router.post("/",
    users.create);
    

/**
  * @swagger
  * /users/change-password:
  *     post:
  *         security:
  *             - bearerAuth: []
  *         description: Allow to an user to change password - Authorization required
  *         tags: [Users]
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         type: object
  *                         properties:
  *                             actualPassword:
  *                                 type: string
  *                             newPassword:
  *                                 type: string
  *         responses:
  *             "200":
  *                 description: A successful message
  *             "401":
  *                 description: Wrong actual password or New password does not match with requirements
  *             "404":
  *                 description: User not found
  */
router.post("/change-password",
    authorize(),
    users.changePassword);

/**
  * @swagger
  * /users/balance:
  *     get:
  *         security:
  *             - bearerAuth: []
  *         description: Allow to get user's balance - Only Drivers are authorized
  *         tags: [Users]
  *         responses:
  *             "200":
  *                 description: A successful message with balance amount
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: object
  *                             properties:
  *                                 balance:
  *                                     type: number
  *             "400":
  *                 description: Invalid JWT token
  */
router.get("/balance",
    authorize([role.DRIVER]),
    users.getBalance);


/**
* @swagger
* /users/chargeBalance:
*     patch:
*         security:
*             - bearerAuth: []
*         description: Allow to charge user's balance - Only Drivers are authorized
*         tags: [Users]
*         requestBody:
*             required: true
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             amount:
*                                 type: number
*         responses:
*             "200":
*                 description: A successful message with updated balance
*                 content:
*                     application/json:
*                         schema:
*                             type: object
*                             properties:
*                                 balance:
*                                     type: number
*             "400":
*                 description: Invalid JWT token
*/   
router.patch("/chargeBalance",
    authorize([role.DRIVER]),
    users.chargeBalance);

module.exports = router;