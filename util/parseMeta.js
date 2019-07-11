// core util function imports
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const uuid = require('uuid/v1');

// Pure Function to accepts 2 params directory Path and Data
// Then write the recieved data to the assigned directory
// TODO: Improve & Extract into helper util function
function writeData(filePath, data) {
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(chalk.green('Meta file is created'));
  });
}

// Setup async function to parse the audio files
// TODO: Improve folder search function to perform recursive for extra folders
// TODO: Perform validation to check if file is audio
// TODO: Complete & Convert Parse Function to factory module
async function ParseFiles() {
  // Setup Function Variables
  // create an array to hold the audio meta data
  const songsArray = [];
  // define relative directory paths to audio files & song metadata
  // TODO: Improve directory look up
  const dirname = path.join(__dirname, '..', 'static', 'audio');
  const metaPath = path.join(__dirname, '..', 'static', 'songs-meta.json');
  // wrap Synchronous functions in try/catch to encapsulate error bubbling
  try {
    // Run sync function to get array of files
    const files = fs.readdirSync(dirname);
    // Iterate through the file list to extract meta
    files.forEach((file) => {
      const filePath = path.join(dirname, file);
      // set up object to define a Song and create meta data
      // TODO: Define a better song model and create middleware function to extract audio metadata
      // ( Length, Artist, Album, Bitrate, Year, Size, etc );
      const song = {
        id: uuid(),
        url: filePath,
        title: file,
      };
      // insert generate Song model into array list
      songsArray.push(song);
    });
  } finally {
    // write the song array to meta file
    writeData(metaPath, songsArray);
  }
}

// Invoke the Parse function and catch bubbled errors
// eslint-disable-next-line no-console
ParseFiles().catch(console.error);
