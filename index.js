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
  playSong(songObject) {
    return `Playing ${songObject.title} from ${songObject.album} by ${songObject.artist} | ${convertSecondsToMinutes(songObject.duration)}.`
  }
}

function playSong(id) {
  let selectedSongObject = getSongById(id)
  console.log(player.playSong(selectedSongObject))
}

function removeSong(id) {
  // 1. match id to object 2.get song index 3.splice the song object from the songs array by index 4.look for song id presence in playlists 5.if present, get index in array 6.splice from playlist songs array

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

//UTILITY FUNCTIONS

//convert from second to mm:ss format. e.g. 160 to 02:40
function convertSecondsToMinutes(time) {
  let minutes = Math.floor(time/60)
  let seconds = time - minutes*60
  let conditionalZeroMinuteDigit = minutes < 10 ? 0 : '' 
  let conditionalZeroSecondDigit = seconds < 10 ? 0 : ''
  //
  return `${conditionalZeroMinuteDigit}${minutes}:${conditionalZeroSecondDigit}${seconds}`
}

function getSongById(songId) {
  for (let songObject of player.songs) {
      if (songObject.id === songId) {
         return songObject
      }
    } 
    throw new Error(`Whoops! we couldn't find a song that matches the ID you entered. (song ID: ${songId})`) 
  }

function getSongIdIndex(songId) {
  let songObj = getSongById(songId)
  return player.songs.indexOf(songObj)
}




//EXTRA FRATURES



//TESTING

console.log(playSong(7))
console.log(player.songs[1])
console.log(convertSecondsToMinutes(99))
console.log(getSongById(5))
console.log(getSongIdIndex(7))



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
