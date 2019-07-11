// core utility function imports
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// invoke the express server
const app = express();

// Set port environment and create a Router
const port = process.env.PORT || 3000;
// TODO: Export Router logic to Router module function
const songRouter = express.Router();

// Define relative storage path locations for meta file and audio files
const songsData = path.join(__dirname, 'static', 'songs-meta.json');

// TODO: Improve & Extract File parsing functions to Helper factory Function
// Simple Search Helper Function To Return a song
// TODO: Complete search function to dynamically evaluate key
const findSong = (file) => {
  fs.readFile(file, (err, data) => {
    if (err) return err;
    const obj = JSON.parse(data);
    obj.forEach((item) => {
      if (item.id === 'd8132ce1-a413-11e9-9dba-470168a6f064') {
        return item;
      }
    });
  });
};

// Route to fetch all songs & meta from flatfile and return a JSON list Object
// TODO: Complete Verbs for /songs route & Add query param to handle search
songRouter.route('/songs')
  .get((req, res) => {
    fs.readFile(songsData, (err, data) => {
      if (err) {
        return res.send(err);
      }
      const songs = JSON.parse(data);
      return res.send(songs);
    });
  });

// Route to fetch a single song from :songTitle param and return a single JSON Object
// TODO: Complete Verbs for /songs/:songTitle route to possibly
songRouter.route('/songs/:songTitle')
  .get((req, res) => { findSong(songsData); });
// Add vanity extension to router logic
app.use('/api', songRouter);

// base url request
app.get('/', (req, res) => {
  res.send('Welcome to Audiophile Songs Api');
});

// set port listener for the express app
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(chalk.blue(`Listening to app on port ${port}`));
});
