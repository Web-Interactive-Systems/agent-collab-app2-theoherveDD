import { atom } from 'nanostores'

export const $playlists = atom([
  {
    "name": "My Playlist",
    "description": "A collection of my favorite songs",
    "songs": [
      { "id": "song-1", "title": "Flowers", "artist": "Miley Cyrus" },
      { "id": "song-2", "title": "As It Was", "artist": "Harry Styles" }
    ]
  },
  {
    "name": "Chill Vibes",
    "description": "Relaxing music for a chill day",
    "songs": [
      { "id": "song-3", "title": "Until I Found You", "artist": "Stephen Sanchez" },
      { "id": "song-4", "title": "Let Her Go", "artist": "Passenger" }
    ]
  }
])

// export const addMessage = (msg) => {
//   // get current messages
//   const msgs = $messages.get()
//   // add msg to the messages
//   $messages.set([...msgs, msg])
// }

// export const updateMessages = (msgs) => {
//   $messages.set(msgs)
// }
