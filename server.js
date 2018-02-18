let express = require("express");
let PORT = process.env.port | 3008;
let bodyParser = require("body-parser");
let _ = require('underscore')

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