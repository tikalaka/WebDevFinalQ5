const express = require("express");
const session = require("express-session");

let port = 3000;

const app = express();

app.use(session({
    secret: 'stinky',
    cookie: {}
}))


app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: true}));

var routes = require('./routes/routes');
app.use("/",routes);

app.listen(port, function(){
    console.log("Listening...on..." + port);
});