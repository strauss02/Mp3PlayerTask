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
  assertStringNotEmpty(title, album, artist)
  assertIsNumber(id)
  assertIdNotUsed(id, player.songs)

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

function removePlaylist(id) {
  let playlist = getPlaylistById(id)
  player.playlists.splice(player.playlists.indexOf(playlist), 1)
}

function createPlaylist(name, id = getVacantId(player.playlists)) {
  assertStringNotEmpty(name)
  assertIsNumber(id)
  assertIdNotUsed(id, player.playlists)

  let newPlaylist = {
    id: id,
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

  //getSongById throws if song does not exist.
  getSongById(songId)

  // if the song exists in the playlist, splice it out of it.
  if (playlist.songs.includes(songId)) {
    playlist.songs.splice(playlist.songs.indexOf(songId), 1)

    //if the playlist is empty after that, also remove it.
    if (playlist.songs.length === 0) {
      removePlaylist(playlistId)
    }
  } else {
    //if the song does not exist in the playlist, push it to the end of it.
    playlist.songs.push(songId)
  }
}

function playlistDuration(id) {
  let playlist = getPlaylistById(id)
  let totalDuration = 0
  for (song of playlist.songs) {
    let songDuration = getSongById(song).duration
    totalDuration += songDuration
  }
  return totalDuration
}

function searchByQuery(query) {
  assertStringNotEmpty(query)
  let searchResults = { songs: [], playlists: [] }
  let lowerCasedQuery = query.toLowerCase()

  for (let song of player.songs) {
    for (songProperty of [song.artist, song.title, song.album]) {
      if (songProperty.toLowerCase().includes(lowerCasedQuery)) {
        searchResults.songs.push(song)
        break
      }
    }
  }
  for (let playlist of player.playlists) {
    if (playlist.name.toLowerCase().includes(lowerCasedQuery)) {
      searchResults.playlists.push(playlist)
    }
  }
  searchResults.songs.sort(sortTitlesAlphabetically)
  searchResults.playlists.sort(sortNameAlphabetically)
  return searchResults
}

function searchByDuration(duration) {
  //function will get duration proximity by subtracting durations. the song/playlist with the smallest duration difference (closest to zero) will be chosen.
  let durationInSeconds = convertMinutesToSeconds(duration)
  // assign temporary value to the variable that will contain the closest match
  let currentClosestDuration = Number.MAX_SAFE_INTEGER
  let match = null
  for (song of player.songs) {
    let durationsDifference = Math.abs(durationInSeconds - song.duration)
    if (durationsDifference < currentClosestDuration) {
      currentClosestDuration = durationsDifference
      match = song
    }
  }
  for (playlist of player.playlists) {
    let currentPlaylistDuration = playlistDuration(playlist.id)
    let durationsDifference = Math.abs(
      durationInSeconds - currentPlaylistDuration
    )
    if (durationsDifference < currentClosestDuration) {
      currentClosestDuration = durationsDifference
      match = playlist
    }
  }
  return match
}

//UTILITY FUNCTIONS

//convert from second to mm:ss format. e.g. 160 to 02:40
function convertSecondsToMinutes(time) {
  assertIsNumber(time)
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  let paddedMinutes = minutes.toString().padStart(2, 0)
  let paddedSeconds = seconds.toString().padStart(2, 0)
  return `${paddedMinutes}:${paddedSeconds}`
}

//convert from mm:ss format to seconds. e.g. 02:40 to 160
function convertMinutesToSeconds(time) {
  //mmssRe matches mm:ss with any amount of minute digits
  let mmssRe = new RegExp(/(^\d{2,})[:](\d{2}$)/)
  let matches = time.match(mmssRe)
  if (!matches) {
    throw new Error('Hopala! time entered has to be in the mm:ss format!')
  }

  let seconds = parseInt(matches[2])
  let minutes = parseInt(matches[1])
  return seconds + minutes * 60
}

function getSongById(id) {
  assertIsNumber(id)
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
  assertIsNumber(id)
  for (let playlist of player.playlists) {
    if (playlist.id === id) {
      return playlist
    }
  }
  throw new Error(
    `Hmmm.. There's no playlist with that ID. (playlist ID: ${id})`
  )
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

//ASSERT FUNCTIONS

function assertIdNotUsed(id, array) {
  for (let item of array) {
    if (id === item.id) {
      throw new Error(`Whoops! seems like ID ${id} is already in use`)
    }
  }
}

function assertIsNumber(arg) {
  if (typeof arg != 'number') {
    throw new Error(`Whoopa! you entered ${arg}. You need to enter a number.`)
  }
}

function assertStringNotEmpty(...args) {
  for (arg of args) {
    if (typeof arg === 'string' && arg.length != 0) {
      continue
    } else throw new Error('Waahh! You must enter a valid string.')
  }
}

//EXTRA FEATURES

//generate song radio playlist
//shuffle
//

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
