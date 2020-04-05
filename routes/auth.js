const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user");

//ROUTES
router.get("/" , (req, res) => {
    res.render("landing");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash("error", err.message);
            res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
            req.flash("success", "Welcome " + user.username);
        })
    });
});


router.get("/login", (req, res) => {
    req.flash("error", "Please login first!");
    res.render("login");
});

router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login" 
    }), (req, res) => {
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;