      
const users = require("../controllers/user.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");

/**
 * Create a new user
 * @route POST /users/
 * @group User - Operations about user
 * @param {string} email.query.required - user's email - eg: valeria.vinci@studenti.unicam.it
 * @param {string} username.query.required - user's username - eg: valeria
 * @param {string} password.query.required - user's password.
 * @param {enum} role.query - user's role - eg: DRIVER,MUNICIPALITY_EMPLOYEE,MUNICIPALITY_POLICE,PARKING_COMPANY
 * @returns {object} 200 - An array of user info 
 * @returns {Error}  400 - Unexpected error
 */
router.post("/",
    users.create);
    
/**
 * Allow to an user to change password
 * @route POST /users/change-password
 * @group User - Operations about user
 * @param {string} actualPassword.query.required - user's old password.
 * @param {string} newPassword.query.required - user's new password.
 * @returns {object} 200 - A successful message 
 * @returns {object} 401 - Wrong actual password or New password does not match with requirements
 * @returns {object} 404 - User not found
 * @security JWT
 */
router.post("/change-password",
    authorize(),
    users.changePassword);

/**
 * Allow to get user's balance
 * @route GET /users/balance
 * @group User - Operations about user
 * @returns {object} 200 - A successful message 
 * @returns {object} 400 - Invalid JWT token
 * @security JWT
 */
router.get("/balance",
    authorize([role.DRIVER]),
    users.getBalance);

/**
 * Allow to charge user's balance
 * @route PATCH /users/chargeBalance
 * @group User - Operations about user
 * @param {string} amount.query.required - amount to charge.
 * @returns {object} 200 - Return new balance 
 * @returns {object} 400 - Invalid JWT token
 * @security JWT
 */    
router.patch("/chargeBalance",
    authorize([role.DRIVER]),
    users.chargeBalance);

module.exports = router;