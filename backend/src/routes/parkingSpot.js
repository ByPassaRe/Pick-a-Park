const parkingSpots = require("../controllers/parkingSpot.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");
/**
* @swagger
* tags:
*   name: Parking Spot
*/
/**
  * @swagger
  *     components:
  *         schemas:
  *             ParkingSpot:
  *                 description: A JSON object containing Parking Spot information
  *                 properties:
  *                     location:
  *                         type: object
  *                         properties:
  *                             latitude:
  *                                 type: number
  *                             longitude:
  *                                 type: number
  *                     price:
  *                         type: number
  *                     activated:
  *                         type: boolean
  *                     available:
  *                         type: boolean
  *         securitySchemes:
  *             bearerAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: Authorization
  */



/**
  * @swagger
  * /parkingSpot/:
  *     post:
  *         security:
  *             - bearerAuth: []
  *         description: Create a parking spot - Only Municipality Employees are Authorized
  *         tags: [Parking Spot]
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         type: object
  *                         properties:
  *                             location:
  *                                 type: object
  *                                 properties:
  *                                     latitude:
  *                                         type: number
  *                                     longitude:
  *                                         type: number
  *                    
  *         responses:
  *             "200":
  *                 description: An array of parking spot information
  *                 content:
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/ParkingSpot'
  *             "400":
  *                 description: Unexpected error
  *         
  */
router.post("/",
    authorize([role.MUNICIPALITY_EMPLOYEE]),
    parkingSpots.create);


/**
  * @swagger
  * /parkingSpot/:
  *     get:
  *         security:
  *             - bearerAuth: []
  *         description: Get all parking spots - Authorization required
  *         tags: [Parking Spot]
  *         responses:
  *             "200":
  *                 description: An array of parking spots
  *                 content:
  *                     application/json:
  *                         schema:
  *                             type: array
  *                             items:
  *                                 $ref: '#/components/schemas/ParkingSpot'
  *             "400":
  *                 description: Unexpected error
  *         
  */
router.get("/",
    authorize([]), 
    parkingSpots.read);

/**
  * @swagger
  * /parkingSpot/{:id}:
  *     patch:
  *         security:
  *             - bearerAuth: []
  *         description: Update a parking spot getted by id - Only Municipality Employees and Parking Company are Authorized
  *         tags: [Parking Spot]
  *         parameters:
  *             - in: path
  *               name: id
  *               schema:
  *                 id: string
  *               required: true
  *               description: ID of the parking spot to patch
  *         responses:
  *             "200":
  *                 description: Parking spot selected
  *                 content:
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/ParkingSpot'
  *             "400":
  *                 description: Unexpected error
  *             "404":
  *                 description: Parking spot not found
  *         
  */
router.patch("/:id",
    authorize([role.MUNICIPALITY_EMPLOYEE,role.PARKING_COMPANY]),
    parkingSpots.patch);

/**
  * @swagger
  * /parkingSpot/{:id}:
  *     put:
  *         security:
  *             - bearerAuth: []
  *         description: Replace a parking spot getted by id - Only Municipally Employees are authorized
  *         tags: [Parking Spot]
  *         parameters:
  *             - in: path
  *               name: id
  *               schema:
  *                 id: string
  *               required: true
  *               description: ID of the parking spot to get 
  *         requestBody:
  *             required: true
  *             content:
  *                 application/json:
  *                     schema:
  *                         $ref: '#/components/schemas/ParkingSpot'
  *         responses:
  *             "200":
  *                 description: Successful message
  *             "400":
  *                 description: Unexpected error
  *         
  */
router.put("/:id", authorize([role.MUNICIPALITY_EMPLOYEE]), parkingSpots.put);


/**
  * @swagger
  * /parkingSpot/nearest:
  *     get:
  *         security:
  *             - bearerAuth: []
  *         description: Get the nearest parking spot from input location - Only Driver are authorized
  *         tags: [Parking Spot]
  *         parameters:
  *             - in: query
  *               name: latitude
  *               schema:
  *                 id: number
  *               required: true
  *               description: user's latitude 
  *             - in: query
  *               name: longitude
  *               schema:
  *                 id: number
  *               required: true
  *               description: user's longitude
  *         responses:
  *             "200":
  *                 description: Parking spot selected
  *                 content:
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/ParkingSpot'
  *             "400":
  *                 description: Unexpected error
  *             "404":
  *                 description: Parking not found
  */
router.get("/nearest",
    authorize([role.DRIVER]),
    parkingSpots.getNearest);

/**
  * @swagger
  * /parkingSpot/{:id}:
  *     get:
  *         security:
  *             - bearerAuth: []
  *         description: Get a parking spot by id - Authorization required 
  *         tags: [Parking Spot]
  *         parameters:
  *             - in: path
  *               name: id
  *               schema:
  *                 id: string
  *               required: true
  *               description: ID of the parking spot to get
  *         responses:
  *             "200":
  *                 description: Parking spot selected
  *                 content:
  *                     application/json:
  *                         schema:
  *                             $ref: '#/components/schemas/ParkingSpot'
  *             "400":
  *                 description: Unexpected error
  *             "404":
  *                 description: Parking not found
  *         
  */
router.get("/:id",
    authorize([]), 
    parkingSpots.read);

/**
  * @swagger
  * /parkingSpot/{:id}/activate:
  *     patch:
  *         security:
  *             - bearerAuth: []
  *         description: Activate a parking spot - Only Municipality employees are authorized
  *         tags: [Parking Spot]
  *         parameters:
  *             - in: path
  *               name: id
  *               schema:
  *                 id: string
  *               required: true
  *               description: ID of the parking spot to activate
  *         responses:
  *             "200":
  *                 description: Successful message
  *             "400":
  *                 description: Unexpected error
  *             "404":
  *                 description: Parking not found
  */
router.patch('/:id/activate', 
    authorize([role.MUNICIPALITY_EMPLOYEE]),
    parkingSpots.activate);


/**
  * @swagger
  * /parkingSpot/{:id}/disable:
  *     patch:
  *         security:
  *             - bearerAuth: []
  *         description: Disable a parking spot - Only Municipality employees are authorized
  *         tags: [Parking Spot]
  *         parameters:
  *             - in: path
  *               name: id
  *               schema:
  *                 id: string
  *               required: true
  *               description: ID of the parking spot to disable
  *         responses:
  *             "200":
  *                 description: Successful message
  *             "400":
  *                 description: Unexpected error
  *             "404":
  *                 description: Parking not found
  */
router.patch('/:id/disable', 
    authorize([role.MUNICIPALITY_EMPLOYEE]),
    parkingSpots.deactivate);


/**
  * @swagger
  * /parkingSpot/{:id}:
  *     delete:
  *         security:
  *             - bearerAuth: []
  *         description: Delete a parking spot
  *         tags: [Parking Spot]
  *         parameters:
  *             - in: path
  *               name: id
  *               schema:
  *                 id: string
  *               required: true
  *               description: ID of the parking spot to delete
  *         responses:
  *             "200":
  *                 description: Successful message
  *             "400":
  *                 description: Unexpected error
  *             "404":
  *                 description: Parking not found
  */
router.delete('/:id', authorize([role.MUNICIPALITY_EMPLOYEE]), parkingSpots.delete);
    
module.exports = router;