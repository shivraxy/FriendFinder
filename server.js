let express = require("express");
var PORT = process.env.PORT || 3000;
let bodyParser = require("body-parser");

let router = express.Router();
let htmlrouter = require("./app/routing/htmlRoutes.js");
// let apirouter = require("./app/routing/apiRoutes.js")

app = express();
app.listen(PORT, function() {
    console.log('Server started at port ' + PORT);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/api/friends', apirouter.router);
app.use('/', htmlrouter);