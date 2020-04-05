const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

let data = [
    {
        name: "Camping Jawor",
        image: "https://www.campingsolina.pl/images/slider/1.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Camping Rozac",
        image: "https://cdn2.suncamp.eu/5/c/6/b/5c6bddfca4dec.jpeg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Camping Polana Sosnowa",
        image: "https://www.polanasosny.pl/wp-content/uploads/2018/08/camping1.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

const seedDB = () => {
    //remove all campgrounds
    // Campground.remove({}, (err) => {
    //     if(err) {
    //         console.log(err);
    //     } 
    //     console.log('removed all campgrounds!');
    //     //add campgrounds
    //     data.forEach((seed) => {
    //         Campground.create(seed, (err, campground) => {
    //             if(err) {
    //                 console.log(err);
    //             } else {
    //                 console.log('campgrounds added!')
    //                 //add comments
    //                 Comment.create(
    //                     {
    //                         text: "This place was great! It was a nice time there!",
    //                         author: "John B."
    //                     }, (err, comment) => {
    //                         if(err) {
    //                             console.log(err);
    //                         } else {
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log('comment added!');
    //                         }
    //                 });
    //             }
    //         });
    //     });
    // });
};

module.exports = seedDB;