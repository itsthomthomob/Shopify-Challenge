// Author: Thomas O'Brien
// Purpose: API routes for OpenAI
// 
// API Path        Verb     Desciption            Status Codes
// /api/AIManager  POST     Connects to OpenAI    202 - Accepted Connection to OpenAI
//
// Modification Log
// 
// 05-18: AIManager.js created
// 05-19: Implemented loadPosts and submitPost API. Author: Thomas O'Brien
// 

// Router for setting up API connections
const router = require("express").Router();
const conn = require("../mysqldb");

const uploadDirectory ='../public/Submissions';

// Test connection
router.get("/", (req, res) =>{
    res.status(200);
})

// Submit posts to MySQL server
router.post("/submitPost", (req, res) => {
    console.log("Test Submission: " + req.body.prompt);
    console.log("Test Response: " + req.body.response);

    let newResponse = req.body.response;
    newResponse = newResponse.replace(/(\r\n|\n|\r)/gm," ");
    newResponse = newResponse.replace(/'/g, 'A');

    var newUser = "INSERT INTO shopifychallenge (prompt, response) VALUES (" + "'" + req.body.prompt + "'" + ", " + "'" + newResponse + "'" + ");";
   
   conn.query(newUser, function (err, result) {
       if (err) throw err;
       console.log("Created new submission.");
   });
});

// Load posts from openAI
router.get("/loadPosts", (req, res) => {
    console.log("Finding posts.");

    let postArray = []
    let allPosts;

    let qry = "select * from shopifychallenge;"

    if(allPosts == null)
    {
        conn.query(qry, function (err, result) {
            if (err) throw err;
            
            allPosts = result[0];

            result.forEach(function (item, index) {
                console.log(item, index);
                postArray.push(item);
            });

            console.log("Sending: " + JSON.stringify(allPosts));
            res.status(202).json({
                curSubmissions: postArray
            });
        });
    }
});


module.exports = router;