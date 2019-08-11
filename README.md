# Randomiser SlackBot

For the moment just sends a basic message but this will eventually do more

## Setup (so far - will change once fully working)

`yarn`

Create .env file

```
SLACK_CLIENT_ID=<SLACK_CLIENT_ID>
SLACK_CLIENT_SECRET=<SLACK_CLIENT_SECRET>
SLACK_VERIFICATION_TOKEN=<SLACK_VERIFICATION_TOKEN>
REDIRECT_URI=<REDIRECT_URI>
BOT_TOKEN=<BOT_TOKEN>
```

`ngrok http 3000`

get the url - and use this url in the slack app

`yarn start`

go to localhost:3000/auth and read the console to get the BOT_AUTH_TOKEN.  Use this in the .env file

In Slack, type `/test` and it will send a message to the general channel

## Some useful links

- https://api.slack.com/slash-commands#creating_commands
- https://api.slack.com/incoming-webhooks#
- https://api.slack.com/tutorials/slack-apps-and-postman
- **PARTICULARLY USEFUL** - https://api.slack.com/tutorials/app-creation-and-oauth
- **PARTICULARLY USEFUL** - https://api.slack.com/docs/oauth#using_tokens
- https://api.slack.com/docs/oauth#redirect_urls
