const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    let firstname = req.body.fname;
    let lastname = req.body.lname;
    let email = req.body.email;

    //aud id 2e88064cfe
    //api key 3a00613f8353f65df412f7ce1651288f-us4
    let data = {
        members: [
            {email_adress: email,
            status: "subscribed",
        merge_fields: {
            FNAME: firstname,
            LNAME: lastname
        }}
        ]
    };

    let jsonData = JSON.stringify(data);

    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/2e88064cfe",
        method: "POST",
        headers: {
            'Authorization': 'turboString 3a00613f8353f65df412f7ce1651288f-us4'
        },
       body: jsonData
    }

    request(options, function(error, response, body){
        if(error){
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });

    console.log(lastname,firstname,email);
});

app.listen(3000, function(){
    console.log("Server is big run");
})