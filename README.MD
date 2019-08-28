# TE-MAIL

An email templating service built in React and NodeJS

## FEATURES/HOW TO

- User can provide an email template with keys denoted by `%%key_name%%` and generate key inputs by clicking on `Commit Template`
- User can provide values for keys and then click `Preview` to request a preview from server
- User can `Send Email` if all fields are provided
- User is warned if their template changes from the template they generated their keys with
- User is told whether their email sent successfully or not

---

## GETTING STARTED

### Production

- `npm start` - creates client bundle and starts the server

### Development

To run the program locally, you will need to provide a `.env` file containing a SendGrid API key into the root folder.

- `npm run start-dev` - builds client, starts server, watches for changes on both for auto-reload during development
- `npm test` - execute all tests (client and server)

---

## TODOS/WORKAROUNDS

### Client

[ ] Regex to generate keys is currently only looking for `<keyName>%%` instead of `%%<keyName>%%`. Need to correct.
[ ] App maintains a `template` and `editedTemplate` state. Can we consolidate these?
[ ] Used `dangerouslySetHtml` property on client to render html from server for email preview. React advises against this practice, but the html is rendered by handlebars in our requests.

### Server

[ ] Fault Tolerance - set up an app instance in server to listen to server failures and restart server if needed
[ ] Key identification in server depends on providing an input body with the matching keys provided. i.e.

---

## STACK/TOOLS

- **Frontend**: ReactJS
- **Backend**: ExpressJS (NodeJS)

### Other Libraries

- [SendGrid](https://github.com/sendgrid/sendgrid-nodejs)
- [HandlebarsJS](https://github.com/wycats/handlebars.js/)

### Tools

- Webpack (& Babel)
- Jest (test-runner)
- SuperAgent (testing server)
- Nock (mocking external requests)
- React-Testing-Library (testing React components)
