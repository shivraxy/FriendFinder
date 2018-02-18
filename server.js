let express = require("express");
let port = process.env.port || 3000;
let bodyParser = require("body-parser");

let router = express.Router();
let htmlrouter = require("./app/routing/htmlRoutes.js");
// let apirouter = require("./app/routing/apiRoutes.js")

app = express();
app.listen(port, function() {
    console.log('Server started at port ' + port);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/api/friends', apirouter.router);
app.use('/', htmlrouter);