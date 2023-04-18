
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const res = require("express/lib/response");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


// so first write the linkof database and its name 
// then we define its scema that ie its sructure new mongoose.Schema()

//steps to see database

//show dbs,
//use databse which you want to use
//show collections of that database
//use db.database.fin()

const app = express();

app.set('view engine', 'ejs');
var tit="";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];

app.get("/",function(req,res)
{
// to give the home page view when we go to home
res.render("home", {startingContent:homeStartingContent,posts:posts});
});

app.get("/about",function(req,res)
{
// to get the contact page
res.render("about", {aboutContent:aboutContent});
});

app.get("/contact",function(req,res)
{

res.render("contact", {contactContent:contactContent});
});



app.get("/compose",function(req,res)
{

res.render("compose");
});

app.post("/compose",function(req,res)
{
  // fetching data of compose page u sing req.body.posttitle uske name ki value h
  // aur vaise hi ham body ke liye bhi kar rahe h

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  // saari values ko ham array main store kara rahe h
  posts.push(post);
  //yeh saare reasult jo h woh home page pe aa jaega
  
res.redirect("/");
});


// THIS IS DONE TO GIVE THE POST_NAME different pages 
//this will chnage the pages dynamically jo ki hamara jo url hota h wahi
app.get("/posts/:postName",function(req,res){
 tit=_.lowerCase(req.params.postName);   // params ham poora url access karne ke liye use kartay h 

posts.forEach(function(post)
{
  // if the name we entered in the url matches with tha any of the post titile
  // then we make a html page of post and render that post content
  // this will open the thing in the new page
  
var storedTitle=post.title;
if(tit===_.lowerCase(storedTitle))
{
  res.render("post",{title:post.title, content:post.content});
} 
});

});














app.listen(3000, function() {
  console.log("Server started on port 3000");
});
