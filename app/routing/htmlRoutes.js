let express = require("express");
let router = express.Router();
let path = require("path");
let fs = require("fs");
let bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// let apirouter = require("./apiRoutes.js");
// // router.use('/api', apirouter);

router.get("/survey", function(request, response) {
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
});

router.post("/api/friends", function(request, response) {

    let matchedUser = {
        name: "",
        photoURL: "",
        TotalDiff: 0
    }
    let json;
    let scoreDiff = 0;

    fs.readFile("./app/data/friends.json", function(err, data) {

        let allfriends = JSON.parse(data); // getting the data as an array

        //Loop though all the friends in the file
        for (let i = 0; i < allfriends.length; i++) {
            scoreDiff = 0;


            array = JSON.parse(JSON.stringify(request.body));
            console.log(array);
            console.log(array.scores[0]);

            //loop through all the scores for a single friend.
            for (j = 0; j < allfriends[i].scores.length; j++) {
                if (parseFloat(allfriends[i].scores[j]) === parseFloat(request.body.scores[j]))
                    scoreDiff = scoreDiff + 0;
                else
                    scoreDiff = scoreDiff + abs(parseFloat(allfriends[i].scores[j]) - parseFloat(request.body.scores[j]));
            }

            //if current friend diff is less than matchedUserDiff then replace otherwise dont do anything

            if (scoreDiff < matchedUser.TotalDiff) {
                matchedUser.name = allfriends[i].name;
                matchedUser.photoURL = allfriends[i].photo;
                matchedUser.TotalDiff = scoreDiff;
            }

        }

        console.log(Mathed + matchedUser.name);

        fs.appendFileSync("./app/data/friends.json", ',' + JSON.stringify(request.body, null, 4));
    })


});

module.exports = router;