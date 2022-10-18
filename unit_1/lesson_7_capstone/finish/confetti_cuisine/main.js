"use strict";

const express = require("express"),
app = express(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
layouts = require("express-ejs-layouts"),
mongoose = require("mongoose"),
Subscriber = require("./models/subscriber");

mongoose.connect(
"mongodb://localhost:27017/recipe_db",
{useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", () => {
console.log("Successfully connected to MongoDB using Mongoose!");
});

var myQuery = Subscriber.findOne({
name: "Jon Wexler"
})
.where("email", /wexler/);
myQuery.exec((error, data) => {
if (data) console.log(data.name);
});

/*db.collection("contacts")
.insert({
name: "Bennedict Nkosi",
email: "fresh@gmail.com"
}, (error, db) => {
if (error) throw error;
console.log(db);
});



var subscriber = new Subscriber({
name: "Fresh Wexler",
email: "fresh@freshwexler.com"
});
subscriber.save((error, savedDocument) => {
if (error) console.log(error);
console.log(savedDocument);
});
Subscriber.create(
{
name: "Stuntman Jones",
email: "stunt@stuntmanjones.com"
},
function (error, savedDocument2) {
if (error) console.log(error);
console.log(savedDocument2);
}
);*/

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));
app.use(
express.urlencoded({
extended: false
})
);
app.use(express.json());

app.get("/", (req, res) => {
res.render("Index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.listen(app.get("port"), () => {
console.log(`Server running at http://localhost:${app.get("port")}`);
});
