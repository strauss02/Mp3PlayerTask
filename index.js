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
  player.songs.splice(getSongIndexById(id),1) 
  for (let playlist of player.playlists) {
    for (let songID of playlist.songs) {
      if (songID === id) {
        playlist.songs.splice(playlist.songs.indexOf(id),1)
      }
    }
  }
}

function addSong(title, album, artist, duration, id) {
  if (checkIdExistence(id,player.songs)) {
    throw new Error(`Whoops! seems like ID ${id} is already in use`)
  }
  let newSong = {
    id: (id ? id : getVacantId(player.songs)),
    title: title,
    album: album,
    artist: artist,
    duration: convertMinutesToSeconds(duration)
  }
  player.songs.push(newSong)
  return newSong.id
}

function removePlaylist(id) {
  let playlist = getPlaylistById(id)
  player.playlists.splice(player.playlists.indexOf(playlist),1)
}

function createPlaylist(name, id) {

  let newPlaylist = { id: id, name: name, songs: []}
  player.playlists.push(newPlaylist)
  return newPlaylist.id
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
  return `${conditionalZeroMinuteDigit}${minutes}:${conditionalZeroSecondDigit}${seconds}`
}

function convertMinutesToSeconds(time) {
  let seconds = parseInt(time.slice(time.length-2,time.length))
  let minutes = parseInt(time.slice([0], time.length-3))
  return seconds + minutes*60
}

function getSongById(songId) {
  for (let songObject of player.songs) {
      if (songObject.id === songId) {
         return songObject
      }
    } 
    throw new Error(`Whoops! we couldn't find a song that matches the ID you entered. (song ID: ${songId})`) 
  }

function getSongIndexById(songId) {
  let songObj = getSongById(songId)
  return player.songs.indexOf(songObj)
}

function getPlaylistById(playlistId) {
  for (let playlist of player.playlists) {
    if (playlist.id === playlistId) {
      return playlist
    } 
  }
  throw new Error(`Hmmm.. There's no playlist with that ID`)
}

function checkIdExistence(id, array) {
  for (let item of array) {
    if (id === item.id) {
      return true
    }
  }
  return false
}

//gets number (i) and goes through all the songs to see if anyone has it. if not, it is considered avaliable.
function getVacantId(array) {
  mainLoop:
  for (let i = 1; i <= array.length+1; i++) {
    for (let item of array) {
      if (item.id === i) {
        continue mainLoop
      }
    }
    return i
  }
}



//EXTRA FRATURES



//TESTING

console.log(convertSecondsToMinutes(99))
console.log(getSongById(5))
console.log(getSongIndexById(7))
console.log(addSong('Smoke on the Water', 'Machine Head', 'Deep Purple', '04:13',  ))
console.log(player.songs)
console.log(getVacantId(player.playlists))
console.log(checkIdExistence(6,player.songs))
console.log(getPlaylistById(5))
console.log(removePlaylist(5))
console.log(createPlaylist('Rock',3))
console.log(player.playlists)

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
