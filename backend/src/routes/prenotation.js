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





/**
 * @swagger
 * /{:id}/proximity/:
 *     patch:
 *         security:
 *             - bearerAuth: []
 *         description: Set proximity - Only Drivers are Authorized
 *         tags: [Prenotation]
 *         parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                 type: string
 *               required: true
 *               description: ID of the prenotation to get 
 *                         
 *         responses:
 *             "200":
 *                 description: Proximity set
 *             "400":
 *                 description: Missing parameters
 *             "500":
 *                 description: Unexpected error
 */
router.patch("/:id/proximity",
  authorize([role.DRIVER]), 
  prenotations.inProximity);





/**
 * @swagger
 * /parkingFired/:
 *     post:
 *         description: Parking sensor fired (the sensor will have to manage this API)
 *         tags: [Prenotation]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             parkingSpotId:
 *                                 type: string
 *                         required:
 *                             - parkingSpotId              
 *         responses:
 *             "200":
 *                 description: Timer activated
 *             "400":
 *                 description: Abuse with prenotation (someone steal the parking spot to other)
 *             "404":
 *                 description: Abuse without prenotation (someone park on it)
 *             "500":
 *                 description: Unexpected error
 */
router.post("/parkingFired", prenotations.parkingSensorFired);



/**
 * @swagger
 * /parkingLeave/:
 *     post:
 *         description: Parking sensor fired during leaving (the sensor will have to manage this API)
 *         tags: [Prenotation]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             parkingSpotId:
 *                                 type: string
 *                         required:
 *                             - parkingSpotId              
 *         responses:
 *             "200":
 *                 description: Payed
 *             "400":
 *                 description: Missing Parameters
 *             "404":
 *                 description: Abuse (someone trigger the sensor without a prenotation)
 *             "500":
 *                 description: Unexpected error
 */
router.post("/parkingLeave", prenotations.parkingSensorLeave);

module.exports = router;
