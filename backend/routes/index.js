module.exports = (app) => {

require("./user")(app);
require("./parkingSpot")(app);

}