const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

//INDEX
router.get("/", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index" , {campgrounds: campgrounds});
        }
    });
    //res.render("campgrounds" , {campgrounds: campgrounds});
})

//CREATE
router.post("/", middleware.isLoggedIn, (req, res) => {
    //get data from form and add it 
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampgrounds = {name: name, price: price, image: image, description: description, author: author};
    //added to db
    Campground.create(newCampgrounds, (err, newItem) => {
        if(err) {
            console.log(err);
        } else {
            //redirect to campgrounds page back
            res.redirect("/campgrounds");
        }
    });
});

//NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

//SHOW
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            req.flash("error", "Campground not found");
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    })
});

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnerShip, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
       if(err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnerShip, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;