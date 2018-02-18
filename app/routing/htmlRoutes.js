let express = require("express");
let router = express.Router();
let path = require("path");
let fs = require("fs");


// let apirouter = require("./apiRoutes.js");
// // router.use('/api', apirouter);

router.get("/survey", function(request, response) {
    console.log("loading Page ..");
    response.sendFile(path.join(__dirname, "..", "\\public\\survey.html"));
});

router.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "\\public\\home.html"));
});

//not sure how to put in another file
router.get("/api/friends", function(request, response) {

    var data = fs.readFileSync("./app/data/friends.js", 'utf8');
    var parsed = data.split('\n').map(function(e) {
        return e.split(', ');
    })
    response.send(parsed);
    response.end();
    // response.send(fs.readFile("./app/data/friends.js"));
});

router.post("/api/friends", function(request, response) {

    fs.writeFile("./app/data/friends.js", ',' + JSON.stringify(request.body));
});

module.exports = router;