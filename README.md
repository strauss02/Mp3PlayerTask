# MP3 Player - Second Weekend Assignment

You are going to implement an MP3 player.

## Instructions

1. Fork this repo into your account.
2. Clone the forked repo to your computer.
3. Execute `npm install` in the project folder to install the [tests](#testing).
4. Create a new git branch for your work.
5. Complete the project [requirements](#requirements).
6. Remember to push your commits regularly to GitHub.
7. Submit your work (explanation [below](#submission))
8. Good luck & have fun!

## Requirements

The player itself is an object that has:

- `songs`: an array of songs
- `playlists`: an array of playlists
- `playSong`: a method that plays a song.
  It receives a song object and should print the following format `"Playing {song.title} from {song.album} by {song.artist} | {song.duration}."` (replace the stuff inside the `{}` with the real values).
  The song duration should be in `mm:ss` format (for example 02:40).

A song object has:

- `id`: a unique ID (a number)
- `title`: a title
- `album`: album title
- `artist`: artist name
- `duration`: duration (number, in seconds)

A playlist object has:

- `id`: a unique ID (a number)
- `name`: a name
- `songs`: an array of song IDs

You are asked to implement the following functions:

- `playSong` - Gets a song ID. Uses `player.playSong` to play the song with the given ID.
- `removeSong` - Gets a song ID. Removes the song with the given ID from the player (from songs and playlists).
- `addSong` - Gets a title, album, artist, duration & ID. Adds a new song with given properties to the player. The ID is optional, and if omitted should be automatically generated. The song duration should be in `mm:ss` format (for example 06:27). Returns the ID of the new song.
- `removePlaylist` - Gets a playlist ID. Remove the playlist with the given ID from the player (does not delete the songs inside it).
- `createPlaylist` - Gets a name & ID. Creates a new, empty playlist with the given details. The ID is optional, and if omitted should be automatically generated. Returns the ID of the new playlist.
- `playPlaylist` - Gets a playlist ID. Plays all songs in the specified playlist, in the order the appear in the playlist.
- `editPlaylist` - Gets a playlist ID & a song ID. If the song ID exists in the playlist, removes it. If it was the only song in the playlist, also deletes the playlist. If the song ID does not exist in the playlist, adds it to the end of the playlist.
- `playlistDuration` - Gets a playlist ID. Returns the total duration of the entire playlist with the given ID.
- `searchByQuery` - Gets a query string. Returns a results object, which has:

  - `songs`: an array of songs in which either title or album or artist contain the query string. The songs should be sorted by their titles.
  - `playlists`: an array of playlists in which the name contains the query string. The playlists should be sorted by their names.

  The comparison in both cases should be case-insensitive.

- `searchByDuration` - Gets a duration in `mm:ss` format (for example 11:03). Returns the song, or playlist, with the closest duration to what was given.

## Testing

We have added some automated tests for you to use. They will help you make sure your code covers the requirements.

To run the tests, execute `npm run test` in the project folder.

**Note**: These tests might not cover everything. Don't just count on them. You should remain responsible and vigilant for other possible edge-cases.

## Grading

Your work will be graded based on the following considerations:

- The number of automatic tests you pass
- Readable and ordered code
  - Spacing & indentation
  - Indicative vairable/function names
  - Comments (where necessary)
- Proper use of Git
  - Granular commits
  - Descriptive commit messages
- Extra features you might have added

## Submission

1. On GitHub, open a pull request from your branch to the main branch.
2. **Do not merge the pull request!**
3. Add the user `Cyber4sPopo` as collaborator to your repo.
4. Submit a link to the pull request in Google Classroom.
5. Remember to enable workflow in your repo under 'actions' tab

## Important Tip

Try to work in small iterations. You've got a big and complex task ahead of you. Break it down into smaller tasks. Concentrate on making small progress every time. Do it step by step.

## Remarks

- The player object must be stored in a global variable called `player`.
- The function, method & property names should be **exactly** as described above (for the tests to function).
- **Avoid code duplication!** You are free to add as many extra functions as you like.
- Pay attention to edge-cases! Your code should throw errors when the user tries to do something invalid (delete a song that doesn't exist, etc.).
- You can use all the material you've learned so far, including extras you've learned on your own.
- Write your code in the `index.js` file. It contains a template which you can use as the basis for your code.
