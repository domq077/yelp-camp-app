const Campground = require("../models/campground");
const Comment = require("../models/comment");

let middlewareObj = {};

//middleware
middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged!"); 
    res.redirect("/login");
};

middlewareObj.checkCommentOwnerShip = (req, res, next) => {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                req.flash("error", "Comment not found"); 
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that!"); 
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged!"); 
        res.redirect("back");
    }
};

middlewareObj.checkCampgroundOwnerShip = (req, res, next) => {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                req.flash("error", "Campground not found"); 
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that!"); 
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged!"); 
        res.redirect("back");
    }
};

module.exports = middlewareObj;