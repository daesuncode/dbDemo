var express = require("express")
var app = express()
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var port = 3000


mongoose.connect("mongodb://localhost/democontacts")
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

// Schema
var personSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    phoneNumber: String
})

// Compile model
var Person = mongoose.model("Person", personSchema)

app.get("/", function(req, res){
    res.render("home")
})

app.get("/people", function(req, res){
    Person.find({}, function(err, allContacts){
        if(err){
            console.log(err)
        } else{
            res.render("people", {people: allContacts})
        }
    })
})

app.get("/people/new", function(req, res){
    res.render("newcontact")
})

app.post("/people", function(req, res){
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var age = req.body.age
    var email = req.body.email
    var phoneNumber = req.body.phoneNumber
    var contact = {firstName: firstName, lastName: lastName, age: age, email: email, phoneNumber: phoneNumber}
    Person.create(contact, function(err, person){
        if(err){
            console.log(err)
        } else{
            res.redirect("/people")
        }
    })
})

app.listen(port, function(){
    console.log(`Your server is running on localhost:${port}`)
})