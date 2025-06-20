import { atom } from 'nanostores'
import {$messages} from "@/store/messages.js";


export const $playlists = atom([
  {
    id: 1,
    name: "My Playlist",
    description: "A collection of my favorite songs",
    songs: [
      { id: "song-1", title: "Flowers", artist: "Miley Cyrus" },
      { id: "song-2", title: "As It Was", artist: "Harry Styles" }
    ]
  },
  {
    id: 2,
    name: "Chill Vibes",
    description: "Relaxing music for a chill day",
    songs: [
      { id: "song-3", title: "Until I Found You", artist: "Stephen Sanchez" },
      { id: "song-4", title: "Let Her Go", artist: "Passenger" }
    ]
  }
]);

export const GetPlaylistByName = (name) => {
  return $playlists.get().find(item => item.name === name);
}

export const DeletePlaylistByName = (name) => {
  return $playlists.get().filter(item => item.name !== name);
}

export const addTrackInPlaylist = (track, name) => {

  const ThePlaylist =  GetPlaylistByName(name);

  console.log("ThePlaylist", ThePlaylist);

  const UpdatePlaylistTracks = {...ThePlaylist,
    songs: [...ThePlaylist.songs, track]
  };

  console.log("UpdateFirstPlaylist", UpdatePlaylistTracks);

  const UpdatePlaylist = [
    UpdatePlaylistTracks,
    ...DeletePlaylistByName(name),
  ];

  console.log("UpdatePlaylist", UpdatePlaylist);
  const SortUpdatePlaylist = [
      ...UpdatePlaylist.sort((a, b) => a.id - b.id),
  ];

  console.log("SortUpdatePlaylist", SortUpdatePlaylist);
  console.log("la playlist de base", $playlists.get())

  $playlists.set([...SortUpdatePlaylist]);

}

export const createPlaylist = (newPlaylist) => {

  const currentPlaylist = $playlists.get();

  const NewId = $playlists.get().length + 1;
  console.log("Playlist", NewId);

  const NewPlaylist = newPlaylist;

  NewPlaylist.id = NewId;

  console.log("New Playlist", NewPlaylist);

  const UpdatePlaylists = [
    ...currentPlaylist, NewPlaylist
  ]

  console.log("UpdatePlaylists", UpdatePlaylists);

  $playlists.set(UpdatePlaylists);

}

