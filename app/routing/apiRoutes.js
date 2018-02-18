let express = require("express");
let router = express.Router();
let path = require("path");
// let bodyParser = require("body-parser");

router.get("/api/friends", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "\\public\\survey.html"));
});

// router.post("/api/friends", function(request, response) {
//     response.sendFile(path.join(__dirname, "..", "\\public\\survey.html"));
// });


module.exports = router;