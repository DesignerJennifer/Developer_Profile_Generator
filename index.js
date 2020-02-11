
//open source code libary with a collection of common interactive command line user interfaces.
var inquirer = require("inquirer");
//An API that gives code to navigate the file system in node
var fs = require('fs');

var axios = require("axios");

var profile = {}

var generateHTML = require("./generateHTML")

function askQuestions(){
    inquirer.prompt([
        {
            //the user will be asked to type a response
            type: "input",
            //User Name
            name: "name",
            //User will see this message asking them to type in their name
            message: "What is your GitHub Username?"
        },
        {
            //the user will be asked to type a response
            type: "list",
            //User's favorite color - which will be displayed in the background
            name: "color",
            choices: ["green", "blue", "pink", "red"],
            //User will see this message asking them to type in their favorite color.
            message: "what is your favorite color?"
        }
       
        ]).then(function(input){
            console.log(input.name, input.color);
            var queryURL = "https://api.github.com/users/" + input.name
     
            axios.get(queryURL).then(function(response){
                    console.log(response)
                    
                    var queryURL = "https://api.github.com/users/" + input.name + "/starred"
                    var countStars = 0;
                    axios.get(queryURL).then(function(response2){

                        console.log(response2.data[0])
                        for (let index = 0; index < response2.data.length; index++) {
                            countStars = countStars + response2.data[index].stargazers_count
                              
                        }
                        console.log(countStars)
                   
                        profile.name = response.data.name;
                        profile.currentJob = response.data.company;
                        profile.location = response.data.location;
                        profile.bio = response.data.bio;
                        profile.pubRespository = response.data.public_repos;
                        profile.followers = response.data.followers;
                        profile.following = response.data.following;
                        profile.stars = countStars;
                        profile.color = input.color;
                        profile.avator = response.data.avatar_url

                        console.log(profile)
                         var html = generateHTML(profile);
                        fs.writeFile("./main.html", html , function(err){

                        })
                       
                    })
            })
        })
}

askQuestions()
//The function that will collect the data for the user profile
//A series of quesions that gathers information that will be displayed in their profile.
//The information will be collected in an Array.


//console.log(name, color, currentJob);


//Photo of person


//User websites and social media:
    //User's location via Google Maps

    //User GitHub Profile

    //User's Blog

//User's Bio

//User's number of public repositories

//Number of followers on GitHub

//Number of GitHub stars

//Number of people the user is following