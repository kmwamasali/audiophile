# Audiophile

A Simple Audio Library API that serves a list of songs & their meta from a local folder

## Getting Started

To run the application first clone the git repo
```
Run "npm install"
```
Add a folder static to root directory
Add a sub-folder audio (/static/audio)
Place audio files in the sub-folder
```
Run "npm start"
```

### TODOS 

```
Export Router logic to module & controller so it's more dynamic
Complete Verbs for /songs route & Add query param to handle search
Complete Verbs for /songs/:songID route
Improve & Extract function that writes metadata to file into helper util function
Add folder search function to perform recursive search for extra folders
Perform validation to check if file is audio
Make File Parse Function more robust
Create a better solution for directory look up
Define a better song model and create middleware function to extract audio metaData
```


### Next Step

```
Complete TODO's
Setup testing of route controllers
DEPLOY as serverless app
```

### Possible Feature Updates

```
Setup a storage bucket with AWS
Create a storage handler function
Update Router controllers to use the bucket API
```