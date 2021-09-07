const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(String.raw`Playing ${song.title} from ${song.album} by ${song.artist} | ${convertSecondsToMinutes(song.duration)}`)
  },
}

function playSong(id) {
  // your code here
}

function removeSong(id) {
  // your code here
}

function addSong(title, album, artist, duration, id) {
  // your code here
}

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

//UTILLITY FUNCTIONS

//convert from second to mm:ss format. e.g. 160 to 02:40
function convertSecondsToMinutes(time) {
  let minutes = Math.floor(time/60)
  let seconds = time - minutes*60
  let conditionalZeroMinuteDigit = minutes < 10 ? 0 : '' 
  let conditionalZeroSecondDigit = seconds < 10 ? 0 : ''
  //
  return `${conditionalZeroMinuteDigit}${minutes}:${conditionalZeroSecondDigit}${seconds}}`
}

function getSongById(songId) {
  for (let songObject of player.songs) {
      if (songObject.id === songId) {
         return songObject
      }
    } 
    throw new Error("ID not found.") 
  }




//EXTRA FRATURES



//TESTING

console.log(player.playSong(player.songs[5]))
console.log(player.songs[1])
console.log(convertSecondsToMinutes(99))

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
