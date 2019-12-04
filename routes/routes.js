const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var fullUrl = 'mongodb+srv://DanAndLuis:DanAndLuis@interactivewebdevfinal-8z02v.mongodb.net/InteractiveUserDatabase?retryWrites=true&w=majority';

mongoose.connect(fullUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected To Database"))
    .catch(err => { console.log(Error, err.message) });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    _id: ObjectId,
    role: String, //admin or user
    username: String,
    fullname: String,
    password: String,
    email: String,
    age: Number,
    status: String,
    q1: String,
    q2: String,
    q3: String

}, { collection: "users" });


const router = express.Router();

const user = mongoose.model("users", UserSchema);

router.route("/").get(
    function (req, res) {
        res.render("index");
    }
);

router.route("/register").get(
    function (req, res) {
        console.log("SENDING TO ADD USER");
        // var model = {
        //     role: req.session.role
        // }
        res.render("register");
    }
)

router.route("/register").post(
    async function (req, res) {
        console.log("ADDING USER I HOPE X3")
        console.log(req.body)
        var model = {
            role: req.session.role
        }
        var item = {
            username: req.body.username,
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            status: "Active",
            q1: req.body.question1,
            q2: req.body.question2,
            q3: req.body.question3
        }
        console.log(item);
        bcrypt.hash(item.password, 10, async function (err, hash) {
            console.log("--hash--")
            console.log(hash)
            console.log("-------")
            console.log(item.password)
            if (item) {
                console.log("Making a User, i hope");
                var newItemInsert = new user({
                    _id: mongoose.Types.ObjectId(),
                    fullname: item.fullname,
                    username: item.username,
                    password: hash,
                    email: item.email,
                    age: item.age,
                    status: "Active",
                    role: "user",
                    q1: item.q1,
                    q2: item.q2,
                    q3: item.q3
                })
                await newItemInsert.save(function (err) {
                    if (err) return handleError(err);
                    console.log("saved user");
                });
            };
        },
            res.redirect("/"));
    }
);
// TO-DO: Suspended accounts should not be able to login and should get a message when they try (or redirect to another page)
router.route("/login").post(
    async function (req, res) {
        console.log(req.body);
        var item = {
            username: req.body.username,
            password: req.body.password,
        }
        await user.findOne({ username: item.username }, function (err, userObj) {
            if (userObj != null) {
                console.log("--------")
                console.log(userObj.username)
                console.log(userObj.role)
                console.log("--------")
                var matches = bcrypt.compare(item.password, userObj.password);
                if (matches) {
                    console.log("login comlpete!")
                    req.session.username = userObj.username;
                    req.session.role = userObj.role;
                    req.session._id = userObj._id;
                    console.log(req.session.role);
                    res.redirect("/home")
                }
                else {
                    console.log("Password is incorrect")
                    model = {
                        message: "User/Password Incorrect"
                    }
                    res.render("index", model);
                }
            }
            else {
                console.log("Username Does Not Exist")
                model = {
                    message: "User/Password Incorrect"
                }
                res.render("index", model);
            }
        })
    }
)

router.route("/home").get(
    function (req, res) {
        var model = {
            role: req.session.role
        }
        res.render("home", model);
    }
);

router.route("/admin").get(
    async function (req, res) {
        usersFromDb = await user.find()

        var model = {
            adminId : req.session._id,
            role: req.session.role,
            users: usersFromDb
        }
        if (model.role == "admin") {
            res.render("admin", model);
        }
        else {
            res.redirect("/");
        }
    }
);
router.route("/admin/:userId/:status").get(
    async function(req, res){
        var userId = req.params.userId;
        var roleChange = req.params.status;
        var oldUser = await user.findOne({ _id: userId })
        if (oldUser){
            if(roleChange){
                await user.updateOne({ _id: userId }, { $set: { status: roleChange } })
            }
            res.redirect("/admin")
        } else {
            res.send("Couldn't find user with id: " + userId)
        }
    }
)
router.route("/admin/:userId").get(
    async function (req, res) {
        var userId = req.params.userId;
        var roleChange = req.params.status;
        console.log(roleChange)
        var oldUser = await user.findOne({ _id: userId })
        if (oldUser) {
            if (oldUser.role == 'admin') {
                await user.updateOne({ _id: userId }, { $set: { role: "user" } })
            } else if (oldUser.role == 'user') {
                await user.updateOne({ _id: userId }, { $set: { role: "admin" } })
            }
            res.redirect("/admin")
        } else {
            res.send("We couldn't find a user with id: " + userId)
        }
    }
)

module.exports = router;