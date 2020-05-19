const prenotations = require("../controllers/prenotation.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");

/**
* @swagger
* tags:
*   name: Prenotation
*/
/**
  * @swagger
  *     components:
  *         schemas:
  *             Prenotation:
  *                 description: A JSON object containing Prenotation information
  *                 properties:
  *                   userId:
  *                     type: string   
  *                   parkingSpotId:
  *                     type: string
  *                   startTime:
  *                     type: string
  *                     format: date-time
  *                   endTime:
  *                     type: string
  *                     format: date-time
  *         securitySchemes:
  *             bearerAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: Authorization
  */





/**
 * @swagger
 * /prenotations/:
 *     post:
 *         security:
 *             - bearerAuth: []
 *         description: Create a prenotation - Only Drivers are Authorized
 *         tags: [Prenotation]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             username:
 *                                 type: string
 *                             parkingSpotId:
 *                                 type: string
 *                         required:
 *                             - username
 *                             - parkingSpotId
 *                         
 *         responses:
 *             "200":
 *                 description: An prenotation information
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Prenotation'
 *             "400":
 *                 description: Missing parameters
 *             "404":
 *                 description: User or Parking not found
 *             "500":
 *                 description: Unexpected error
 */
router.post("/",
  authorize([role.DRIVER]),
  prenotations.create);

router.patch("/:id/proximity", authorize([role.DRIVER]), prenotations.inProximity);

router.post("/parkingFired", prenotations.parkingSensorFired);
router.post("/parkingLeave", prenotations.parkingSensorLeave);

module.exports = router;
