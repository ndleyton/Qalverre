# dotEnv file

## Requirements 
- Node Package manager (npm)
- gitignore file


## Install
```
npm install dotenv
```
## dotEnv file itself
- In the root of your project, create a .env file.
- Add your CLIENT_ID and CLIENT_SECRET 
- *IMPORTANT*: We'd usually use OAuth to fetch these, but since we'll only use one, we can store them in an env.
    - Why? Because we can keep it from being uploaded to git.
    - How? By adding it to the file ".gitignore"

## Use it
- "Import" it
```
require('dotenv').config();
```

#### Example code
```javascript
require('dotenv').config();
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'yourRedirectUri';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ access_token: 'YOUR_ACCESS_TOKEN' });
```