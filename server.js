require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const request = require("request")
const path = require('path')

const team = require('./team.json')

const app = express()

const PORT = 3000

app.listen(process.env.PORT || PORT, function () {
  console.log('Bot is listening on port ' + PORT)
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

const randomiser = () => {
  const teamList = team.TEAM
  const random = teamList[Math.floor(Math.random() * teamList.length)]
  return random
}

app.get('/', (req, res) => {
  const text = 'I see you'
  res.send(text)
})

app.get('/random', (req, res) => {
  const text = randomiser()
  res.send(text)
})

app.get('/auth', (req, res) =>{
  res.sendFile(__dirname + '/add-to-slack.html')
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/', (req, res) => {
  const randomPerson = randomiser()
var data = {form: {
      token: process.env.BOT_TOKEN,
      channel: "general",
      text: "Hi! :wave: \n I'm your new bot. It's " + randomPerson + "'s turn to do stuff"
    }};
request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
      // Sends welcome message
      // console.log(response)
      res.json();
    });
});

app.get('/auth/redirect', (req, res) =>{
  // console.log(req.query.code)
  // console.log(process.env.SLACK_CLIENT_ID)
  // console.log(process.env.SLACK_CLIENT_SECRET)
  var options = {
      uri: 'https://slack.com/api/oauth.access?code='
          +req.query.code+
          '&client_id='+process.env.SLACK_CLIENT_ID+
          '&client_secret='+process.env.SLACK_CLIENT_SECRET+
          '&redirect_uri='+process.env.REDIRECT_URI,
      method: 'GET'
  }
  request(options, (error, response, body) => {
      var JSONresponse = JSON.parse(body)
      if (!JSONresponse.ok){
          console.log("json:", JSONresponse)
          res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
      }else{
          console.log(JSONresponse)
          res.send("Success!")
      }
  })
})