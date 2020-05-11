const bugReports = require('./../controllers/bugReport');
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");
/**
* @swagger
* tags:
*   name: Bug Report
*/
/**
  * @swagger
  *     components:
  *         schemas:
  *             BugReport:
  *                 description: A JSON object containing Bug Report information
  *                 properties:
  *                     text:
  *                         type: string
  *         securitySchemes:
  *             bearerAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: Authorization
  */


 /**
  * @swagger
  * /bugReports/:
  *     post:
  *         security:
  *             - bearerAuth: []
  *         description: Create a bug report - Only Driver, Municipality Employee and Municipality Police are Authorized
  *         tags: [Bug Report]
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         $ref: '#/components/schemas/BugReport'
  *         responses:
  *             "200":
  *                 description: An array of bug report information
  *             "400":
  *                 description: Missing parameters
  *             "500":
  *                 description: Unexpected error
  */
router.post('/',authorize([role.DRIVER, role.MUNICIPALITY_EMPLOYEE, role.MUNICIPALITY_POLICE]), bugReports.create);

 /**
  * @swagger
  * /bugReports/:
  *     get:
  *         security:
  *             - bearerAuth: []
  *         description: Return all Bug Report - Only Parking Company are Authorized
  *         tags: [Bug Report]
  *         responses:
  *             "200":
  *                 description: An array of bug reports 
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/BugReport'
  *             "400":
  *                 description: Missing parameters
  *             "500":
  *                 description: Unexpected error
  */
router.get('/', authorize([role.PARKING_COMPANY]), bugReports.get);

module.exports = router;