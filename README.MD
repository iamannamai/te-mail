# TE-MAIL

An email templating service built in React and NodeJS

## Features/How To

- User can provide an email template with keys denoted by `%%key_name%%` and generate key inputs by clicking on `Commit Template`
- User can provide values for keys and then click `Preview` to request a preview from server
- User can `Send Email` if all fields are provided
- User is warned if their template changes from the template they generated their keys with
- User is told whether their email sent successfully or not

## TODO

### Client

[ ] Regex to generate keys is currently only looking for `<keyName>%%` instead of `%%<keyName>%%`. Need to correct.
[ ] App maintains a `template` and `editedTemplate` state. Can we consolidate these?

### Server

[ ] Fault Tolerance - set up an app instance in server to listen to server failures and restart server if needed
[ ] Key identification in server depends on providing an input body with the matching keys provided. i.e.

## Getting Started

### Production

- `npm start` - creates client bundle and starts the server

### Development

To run the program locally, you will need to provide a `.env` file containing a SendGrid API key into the root folder.

- `npm run start-dev` - builds client, starts server, watches for changes on both for auto-reload during development
- `npm test` - execute all tests (client and server)

## Stack/Tools

- **Frontend**: ReactJS
- **Backend**: ExpressJS (NodeJS)

### Other Libraries

- SendGrid
- HandlebarsJS

### Tools

- Webpack (& Babel)
- Jest (test-runner)
- SuperAgent (testing server)
- React-Testing-Library (testing React components)
