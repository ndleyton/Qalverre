# Qalverre

# Steps

1. **Set Up Google Cloud Project and Authentication**:
   - Create a [Google Cloud project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) and enable the Google Drive API.
   - Set up authentication credentials (OAuth 2.0) to access the Google Drive API. You'll get a `client_id`, `client_secret`, and `redirect_uris`.

2. **Install Google API Client Library**:
   - Use [npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) to install the Google API Node.js client library:

     ```bash
     npm install googleapis
     ```

3. **MVP Fetch Images and Their Thumbnails**:
   - Make a request to the Google Drive API to list the files and obtain their thumbnail links.

Example code:

```javascript
require('dotenv').config();
const { google } = require('googleapis');
const OAuth2Data = require('./credentials.json');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Set the access token, obtained from previous authentication steps
oAuth2Client.setCredentials({ access_token: 'YOUR_ACCESS_TOKEN' });

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

drive.files.list({
  pageSize: 10, // Adjust the number of files returned
  fields: 'nextPageToken, files(id, name, thumbnailLink)',
  q: "mimeType='image/jpeg'", // Adjust MIME type if necessary
}, (err, res) => {
  if (err) throw err;
  const files = res.data.files;
  if (files.length) {
    console.log('Files:');
    files.map((file) => {
      console.log(`${file.name} (${file.id}), Thumbnail: ${file.thumbnailLink}`);
    });
  } else {
    console.log('No files found.');
  }
});
```
4. **Continue in chosen Framework**:
- [NEXT.js](https://nextjs.org):
    - Everything is javascript
    - React Frontend + it's own backend
    - Vercel (parent company) makes it easy to deploy, but they are a bit more expensive than hosting yourself 
- Remix:
    - Similar, without the parent company that makes the hosting a bit easier
- Sveltekit
    - Svelte front end + it's own backend
    - newer, pretty liked among devs

- Ruby on rails
    - "la vieja confiable, pero bien vieja"
    - Knowledge is not AS transferable
    - Testing is a bit more integrated

Those are the ones that are "Eveything in a package", but then you can mix any frontend with any backend.
Popular Frontends (sort of in order):
- React      (industry standard pretty much)
- Vue.js
- Angular 
- Svelte


- htmx       (not sure if it would work for this, but it's the minimalist option)

Popular backends:
- Django
- express
- Laravel



5. **MVP**:
- In chosen framework do a Minimup Viable Product: 
    - For example you go http:://Localhost:3000, it shows a picture from your google drive
- Make a test for it!

6. **CI/CD**
- Implement a CI, github has options

7. **Testing**
- Keep writing tests, you can write a test to fail and then you develop until it succeeds


## Concepts

### HTTP Requests
POST, GET, PUT, and DELETE. These correspond to create, read, update, and delete (or CRUD) operations, respectively
- GET
    - "Give me according to X"
- POST
    - "Create according to X, I might receive something"
- DELETE
- PUT 
    - "Change this one ... usually"

### Frontend vs Backend
- Frontend very loosely is "what the user interacts wih", backend is what supports that

### Typescript
- Javascript with Types

### Responsiveness
- Usually you want an app to update with real time data, but it's not necessary with this one, so the biggest selling point fot React (and thus NextJS and Remix) is not that important.
- Also, instead of setting up an async function to send the new photos/data to the client, we can send it when a user takes a picture! and it makes it the app's quirk! (You want photos? send one!)
    - This means, when we get a POST request sending a picture, we also run what we'd do in a GET request situation
- Also without a DB and an ORM, it's kind of difficult

### Node.js
- Node.js enables JavaScript to be used for server-side scripting.
- "JavaScript everywhere" 
#### npm (Node Package Manager)
- package manager for Node.js

### Git branches
You usually want to work a new feature in a new branch, merge that one with dev and then merge dev with main

### Database
We... aren't using one here , it's your google drive through an API. BUT if we did use one:
##### Relational Database
Any SQL thingies
- PosgreSQL    (industry standard)
- SQLite
- MySQL
- etc
##### Non-relational database
You don't care about the... relations amongst data
- Cassandra
- MongoDB