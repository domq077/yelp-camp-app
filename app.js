const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const port = 3000;
const app = express();
const User = require('./models/user');
const seedDB = require('./seeds');
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const authRoutes = require("./routes/auth");


mongoose.connect(/database url/);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "The Bunny is the most jumping animal in the world!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));