let express = require("express");
let router = express.Router();
let path = require("path");
let fs = require("fs");
let bodyParser = require("body-parser");
let friends = require('../data/friends');

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
    response.send(friends.data);
    response.end();
});

router.post("/api/friends", function(request, response) {

    let matchedUser = {
        name: "",
        photoURL: "",
        TotalDiff: 0
    }

    let json;
    let scoreDiff;
    //Loop though all the friends in the file

    for (let i = 0; i < friends.data.length; i++) {
        scoreDiff = 0;
        array = JSON.parse(JSON.stringify(request.body));
        //loop through all the scores for a single friend.
        for (j = 0; j < friends.data[i].scores.length; j++) {
            if (parseFloat(friends.data[i].scores[j]) === parseFloat(array['scores[]'][j]))
                scoreDiff = scoreDiff + 0;
            else
                scoreDiff = scoreDiff + Math.abs(parseFloat(friends.data[i].scores[j]) - parseFloat(array['scores[]'][j]));
        }

        if (i === 0) {
            matchedUser.name = friends.data[i].name;
            matchedUser.photoURL = friends.data[i].photo;
            matchedUser.TotalDiff = scoreDiff;
        }

        //if current friend diff is less than matchedUserDiff then replace otherwise dont do anything

        if (matchedUser.TotalDiff > scoreDiff) {
            matchedUser.name = friends.data[i].name;
            matchedUser.photoURL = friends.data[i].photo;
            matchedUser.TotalDiff = scoreDiff;
        }

        console.log('Name : ' + friends.data[i].name + ' score >> ' + scoreDiff)
    }

    console.log('Finally Matched ' + matchedUser.name + ' Score >> ' + matchedUser.TotalDiff);
    responseText = 'Finally Matched ' + matchedUser.name + ' Computed - Score: ' + matchedUser.TotalDiff;
    //display modal

    friends.data.push(array);
    response.send(responseText);

})

module.exports = router;