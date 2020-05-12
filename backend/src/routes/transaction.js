const transactions = require("../controllers/transaction.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");


   
/**
  * @swagger
  * tags:
  *   name: Transactions
  */
/**
  * @swagger
  *     components:
  *         schemas:
  *             Transaction:
  *                 description: A JSON object containing Transaction information
  *                 properties:
  *                     amount:
  *                         type: number
  *                     userId:
  *                         type: string   
  *         securitySchemes:
  *             bearerAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: Authorization
  */

 /**
  * @swagger
  * /transactions/:
  *     get:
  *         security:
  *             - bearerAuth: []
  *         description: Return all transactions - 
  *         tags: [Transactions]
  *         responses:
  *             "200":
  *                 description: An array of transactions - Only Parking Company are Authorized
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Transaction'
  *             "400":
  *                 description: Unexpected error
  */
router.get("/",
    authorize([role.PARKING_COMPANY]),
    transactions.read);

module.exports = router;