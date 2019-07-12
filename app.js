// core utility function imports
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// invoke the express server
const app = express();

// Set port environment and create a Router
const port = process.env.PORT || 3000;
// TODO: Export Router logic to Router module & controller so it's more dynamic
// Also a good practice for cleaner code
const songRouter = express.Router();

// Define relative storage path locations for meta file and audio files
const songsData = path.join(__dirname, 'static', 'songs-meta.json');

// Route to fetch all songs & meta from flatfile and return an Array of song objects
// TODO: Complete Verbs for /songs route & Add query param to handle search
// TODO: Create readFile middleware function to avoid repitition
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

// Route to fetch a single song from :songID param and return a single JSON Object
// TODO: Complete Verbs for /songs/:songID route
songRouter.route('/songs/:songID')
  .get((req, res) => {
    fs.readFile(songsData, (err, data) => {
      if (err) return err;
      const track = JSON.parse(data).find(song => song.id === req.params.songID.toString());
      if (track) return res.send(track);
      return res.status(404).send('Did not find that song');
    });
  });
// Vanity extension to router path
app.use('/v1', songRouter);

// base url request
app.get('/', (req, res) => {
  res.send('Welcome to Audiophile Songs Api navigate to /v1/songs to access list');
});

// set port listener for the express app
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(chalk.blue(`Listening to app on port ${port}`));
});
