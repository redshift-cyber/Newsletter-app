const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
  
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email);

    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            },
        ],
    };

    let jsonData = JSON.stringify(data);
    let url = 'https://us6.api.mailchimp.com/3.0/lists/e888c340aa';

    const options = {
        method: 'POST',
        auth: "fsdf:179566baa52e7d5a1ff78ebb2c84ac36-us6",
    };

    const request = https.request(url, options, function (response) {

   if(response.statusCode === 200) {
       res.sendFile(__dirname + "/success.html")
   } else{
       res.sendFile(__dirname + "/failure.html")
   }


        response.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/fail", function(req, res){
    res.redirect("/")
})


app.listen(3000, () => {
    console.log("server is running on port 3000");
});

//API key
//71ba04231c46b2937c3422762d61e51a-us6
//List if e888c340aa
