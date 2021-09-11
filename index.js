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
    return `Playing ${song.title} from ${song.album} by ${
      song.artist
    } | ${convertSecondsToMinutes(song.duration)}.`
  },
}

function playSong(id) {
  let song = getSongById(id)
  console.log(player.playSong(song))
}

function removeSong(id) {
  //remove song from songs
  player.songs.splice(getSongIndexById(id), 1)

  // remove from playlists
  for (let playlist of player.playlists) {
    for (let songID of playlist.songs) {
      if (songID === id) {
        playlist.songs.splice(playlist.songs.indexOf(id), 1)
      }
    }
  }
}

function addSong(
  title,
  album,
  artist,
  duration,
  id = getVacantId(player.songs)
) {
  checkIdIsValid(id)
  if (checkIdExists(id, player.songs)) {
    throw new Error(`Whoops! seems like ID ${id} is already in use`)
  }
  let newSong = {
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: convertMinutesToSeconds(duration),
  }
  player.songs.push(newSong)
  return newSong.id
}

console.log(addSong('Axel F', 'Crazy Frog 1', 'Crazy Frog', '02:40', 'banana'))

function removePlaylist(id) {
  let playlist = getPlaylistById(id)
  player.playlists.splice(player.playlists.indexOf(playlist), 1)
}

function createPlaylist(name, id) {
  // try {
  //   checkIdIsValid(id)
  // }
  // catch {
  //   if (err === existenceError) {
  //     let newPlaylistId = getVacantId(player.playlists)
  //   }
  // }
  if (checkIdExists(id, player.playlists)) {
    throw new Error('Whoa! that ID is already taken!')
  }
  let newPlaylist = {
    id: id ? id : getVacantId(player.playlists),
    name: name,
    songs: [],
  }
  player.playlists.push(newPlaylist)
  return newPlaylist.id
}

function playPlaylist(id) {
  let playlist = getPlaylistById(id)
  for (song of playlist.songs) {
    playSong(song)
  }
}

function editPlaylist(playlistId, songId) {
  let playlist = getPlaylistById(playlistId)
  //if the song exists, and the playlist does not include it, push the songId into the playlist songs array.
  if (getSongById(songId) && !playlist.songs.includes(songId)) {
    playlist.songs.push(songId)
    //every other case means the song exists and is already in the array. so splice it out of the array.
  } else {
    playlist.songs.splice(playlist.songs.indexOf(songId), 1)
    //if the playlist is empty after that, also remove it.
    if (playlist.songs.length === 0) {
      removePlaylist(playlistId)
    }
  }
}

function playlistDuration(id) {
  // return total duration of all songs in that playlist. 1.get the playlist 2.get each duration by id 3.return sum
  let playlist = getPlaylistById(id)
  let totalDuration = 0
  for (song of playlist.songs) {
    let songDuration = getSongById(song).duration
    totalDuration += songDuration
  }
  return totalDuration
}

function searchByQuery(query) {
  let searchResults = { songs: [], playlists: [] }
  let casedQuery = query.toLowerCase()

  for (let song of player.songs) {
    if (
      song.artist.toLowerCase().includes(casedQuery) ||
      song.title.toLowerCase().includes(casedQuery) ||
      song.album.toLowerCase().includes(casedQuery)
    ) {
      searchResults.songs.push(song)
    }
  }
  for (let playlist of player.playlists) {
    if (playlist.name.toLowerCase().includes(casedQuery)) {
      searchResults.playlists.push(playlist)
    }
  }
  searchResults.songs.sort(sortTitlesAlphabetically)
  searchResults.playlists.sort(sortNameAlphabetically)
  return searchResults
}

function searchByDuration(duration) {
  // gets duration in mm:ss. returns song / playlist with the closest duration
  //go through all songs. for each song duration, the one closest becomes durationMatch.
  //go through all playlists. for each playlists, the one closest become durationMatch
  let durationMatch = 1000
  let match = undefined
  let formattedDuration = convertMinutesToSeconds(duration)
  console.log(formattedDuration)
  for (song of player.songs) {
    if (Math.abs(formattedDuration - song.duration) < durationMatch) {
      console.log(durationMatch)
      durationMatch = Math.abs(formattedDuration - song.duration)
      console.log(durationMatch)
      match = song
      console.log(match)
    }
  }
  for (playlist of player.playlists) {
    let currentPlaylistDuration = playlistDuration(playlist.id)
    if (Math.abs(formattedDuration - currentPlaylistDuration) < durationMatch) {
      match = playlist
    }
  }
  console.log(match)
  return match
}

//UTILITY FUNCTIONS

//convert from second to mm:ss format. e.g. 160 to 02:40
function convertSecondsToMinutes(time) {
  // if () {
  //   throw new Error(
  //     'Invalid argument: time entered is not a number or a string containing a number.'
  //   )
  // }
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  let paddedMinutes = minutes.toString().padStart(2, 0)
  let paddedSeconds = seconds.toString().padStart(2, 0)
  return `${paddedMinutes}:${paddedSeconds}`
}

//convert from mm:ss format to seconds. e.g. 02:40 to 160
function convertMinutesToSeconds(time) {
  // TODO: maybe add string check?
  let seconds = parseInt(time.slice(time.length - 2, time.length))
  let minutes = parseInt(time.slice(0, time.length - 3))
  return seconds + minutes * 60
}

function getSongById(id) {
  checkIdIsValid(id)
  for (let song of player.songs) {
    if (song.id === id) {
      return song
    }
  }
  throw new Error(
    `Whoops! we couldn't find a song that matches the ID you entered. (song ID: ${id})`
  )
}

function getSongIndexById(id) {
  let song = getSongById(id)
  return player.songs.indexOf(song)
}

function getPlaylistById(id) {
  checkIdIsValid(id)
  for (let playlist of player.playlists) {
    if (playlist.id === id) {
      return playlist
    }
  }
  throw new Error(`Hmmm.. There's no playlist with that ID`)
}

function checkIdExists(id, array) {
  for (let item of array) {
    if (id === item.id) {
      return true
    }
  }
  return false
}

//gets number (i) and goes through all the songs / playlists to see if anyone has it. if not, it is considered avaliable.
function getVacantId(array) {
  mainLoop: for (let i = 1; i <= array.length + 1; i++) {
    for (let item of array) {
      if (item.id === i) {
        continue mainLoop
      }
    }
    return i
  }
}

function sortTitlesAlphabetically(a, b) {
  return a.title.localeCompare(b.title)
}

function sortNameAlphabetically(a, b) {
  return a.name.localeCompare(b.name)
}

function checkIdIsValid(id) {
  if (typeof id != 'number') {
    throw new Error('Whoopa! ID should be a number.')
  }
}

//EXTRA FRATURES

//ERROR OBJECTS

//TODO: add exception classes for each error and make a standard format

//TESTING

console.log(convertSecondsToMinutes(99))
console.log(getSongById(4))
console.log(getSongIndexById(7))
console.log(convertSecondsToMinutes(160))
console.log(playSong(2))
console.log(getVacantId(player.playlists))
console.log(getPlaylistById(5))
console.log(createPlaylist('Rock', 9))
console.log(player.playlists)
console.log(playPlaylist(1))
console.log(editPlaylist(9, 5))
console.log(player.playlists)
console.log(editPlaylist(9, 5))
console.log(player.playlists)
console.log(editPlaylist(5, 3))
console.log(player.playlists)
console.log(playlistDuration(5))
console.log(searchByDuration('03:07'))
console.log(convertMinutesToSeconds('03:07'))

//NOTICE
/*
    1. what is the policy of handling ID's? can it be 0? can it be negative? requires clarification
    2. add error if invalid duration format was entered

*/

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
