const issues = require("../controllers/issue.js");
const router = require("express").Router();
/**
* @swagger
* tags:
*   name: Issues
*/
/**
  * @swagger
  *     components:
  *         schemas:
  *             Issue:
  *                 description: A JSON object containing Issue information
  *                 properties:
  *                     text:
  *                         type: string
  *                     parkingSpot:
  *                         type: string   
  *         securitySchemes:
  *             bearerAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: Authorization
  */



 /**
  * @swagger
  * /issues/:
  *     post:
  *         security:
  *             - bearerAuth: []
  *         description: Create an issue - Only Municipality Polices are Authorized
  *         tags: [Issues]
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         $ref: '#/components/schemas/Issue'
  *         responses:
  *             "200":
  *                 description: An array of issue information
  *             "400":
  *                 description: Unexpected error
  */
router.post("/", issues.create);


 /**
  * @swagger
  * /issues/:
  *     get:
  *         security:
  *             - bearerAuth: []
  *         description: Return all issues - 
  *         tags: [Issues]
  *         responses:
  *             "200":
  *                 description: An array of issues - Only Municipality Polices are Authorized
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/Issue'
  *             "400":
  *                 description: Unexpected error
  */
router.get("/", issues.read);

/**
  * @swagger
  * /issues/{:id}:
  *     get:
  *         security:
  *             - bearerAuth: []
  *         description: Get an issue by id
  *         tags: [Issues]
  *         parameters:
  *             - in: path
  *               name: id
  *               schema:
  *                 type: string
  *               required: true
  *               description: ID of the issue to get 
  *         responses:
  *             "200":
  *                 description: An array of issues - Only Municipality Polices are Authorized
  *                 content:
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/Issue'
  *             "400":
  *                 description: Unexpected error
  *             "404":
  *                 description: Issue not found
  */
router.get("/:id", issues.read);

/**
  * @swagger
  * /issues/{:id}:
  *     post:
  *         security:
  *             - bearerAuth: []
  *         description: Resolve an issue acquired by id - Only Municipality Polices are Authorized
  *         tags: [Issues]
  *         parameters:
  *             - in: path
  *               name: id
  *               schema:
  *                 type: string
  *               required: true
  *               description: ID of the issue to get 
  *         responses:
  *             "200":
  *                 description: Successful message
  *             "400":
  *                 description: Unexpected error
  *             "404":
  *                 description: Issue not found
  *             "500":
  *                 description: Updating issue problem
  * 
  */
router.post("/:id", issues.update);

module.exports = router;