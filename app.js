const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {google} = require('googleapis');

const TOKEN_PATH = path.join(process.cwd(), 'token.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      console.log(credentials)
      return google.auth.fromJSON(credentials);
    } catch (err) {
      console.log(err)
      return null;
    }
  }
  


document.getElementById('capture').addEventListener('click', async function() {
    let client = await loadSavedCredentialsIfExist();
    console.log(client)
    console.log(client.credentials)
    //
    const cameraStreamElement = document.getElementById('cameraStream');
    const photoElement = document.getElementById('photo');
    const lastPhotoElement = document.getElementById('lastPhoto');
    const context = photoElement.getContext('2d');

    // Ensure the canvas is the same size as the video stream
    photoElement.width = cameraStreamElement.videoWidth;
    photoElement.height = cameraStreamElement.videoHeight;

    // Ensure the canvas is the same size as the video stream
    lastPhotoElement.width = cameraStreamElement.videoWidth;
    lastPhotoElement.height = cameraStreamElement.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(cameraStreamElement, 0, 0, photoElement.width, photoElement.height);

    // You can now use photoElement.toDataURL() to get the image data and do something with it
    console.log(photoElement)
    console.log(photoElement.toDataURL())
    photoElement.toDataURL()

     // Convert the canvas to a data URL and set it as the source of the lastPhoto element
     const dataURL = photoElement.toDataURL('image/png');
     lastPhotoElement.src = dataURL;
     lastPhotoElement.style.display = 'block'; // Show the last photo element

     // Convert the canvas to a Blob
    photoElement.toBlob(async function(blob) {
        // Prepare the request
        const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media';
        // TODO:fill out authorization
        const headers = new Headers({
            'Authorization': "bearer" + client.credentials.access_token,
            'Content-Type': 'image/jpeg',
            'Content-Length': blob.size.toString()
        });

        // Send the POST request
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: blob
            });

            if (!response.ok) throw new Error(`Server responded with ${response.status}`);

            const result = await response.json();
            console.log('Upload successful, file ID:', result.id);
        } catch (error) {
            console.error('Error during upload:', error);
        }
    }, 'image/jpeg');
});

// Request access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        const cameraStreamElement = document.getElementById('cameraStream');
        cameraStreamElement.srcObject = stream;
    })
    .catch(function(error) {
        console.log("Error accessing the camera: " + error);
    });
