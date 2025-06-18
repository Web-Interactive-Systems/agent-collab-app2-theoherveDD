import { atom } from 'nanostores'
import {$messages} from "@/store/messages.js";

export const $playlists = atom([
  {
    name: "My Playlist",
    description: "A collection of my favorite songs",
    songs: [
      { id: "song-1", title: "Flowers", artist: "Miley Cyrus" },
      { id: "song-2", title: "As It Was", artist: "Harry Styles" }
    ]
  },
  {
    name: "Chill Vibes",
    description: "Relaxing music for a chill day",
    songs: [
      { id: "song-3", title: "Until I Found You", artist: "Stephen Sanchez" },
      { id: "song-4", title: "Let Her Go", artist: "Passenger" }
    ]
  }
]);

export const addTrackInPlaylist = (track) => {
  const currentPlaylists = $playlists.get();

  console.log(track);

  const UpdateFirstPlaylist = {...currentPlaylists[0],
    songs: [...currentPlaylists[0].songs, track]
  };

  const UpdatePlaylist = [
    UpdateFirstPlaylist,
    ...currentPlaylists.slice(1),
  ];

  $playlists.set([...UpdatePlaylist]);

  console.log(...currentPlaylists.slice(0));
}