const app = require('./app');
const db = require('./dbHandler');

const PORT = process.env.PORT || 5000;

dbUrl = process.env.DBURI || "mongodb://localhost:27017/test";

db.connect(dbUrl).then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, function() {
      console.log('Server is running on port:', PORT);
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});