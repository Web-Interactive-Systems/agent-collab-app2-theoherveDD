import { Resizable } from '@/components/Resizable'
import Chat from '@/features/chat/Chat'
import { Flex } from '@radix-ui/themes'
import Playlist from '@/features/playlist/Playlist'
import Player from '@/features/player/Player'
import { useState, useEffect } from 'react'
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const sdk = SpotifyApi.withUserAuthorization(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    ['user-read-playback-state', 'user-modify-playback-state'],
);

sdk.currentUser.profile().then(profile => {
    console.log('Utilisateur connecté:', profile.display_name);
});


function HomePlaylist() {

    const [activeTab, setActiveTab] = useState();
    const [accessToken, setAccessToken] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);

    async function fetchToken() {
        if (typeof sdk?.getAccessToken === 'function') {
            const token = await sdk.getAccessToken();
            setAccessToken(token?.access_token || null);
        }
    }

    useEffect(() => {
        fetchToken();

    }, []);

    console.log(accessToken);
    console.log("currentSong", currentSong);

    console.log("FONCTION DE PLAYER", sdk.player);

  return (
    <Flex
      gap='2'
      width='100%'
      height='100%'>
        <Flex p="15px" direction='column' justify='center' width="100%">
            <Playlist currentSong={currentSong} setCurrentSong={setCurrentSong} activeTab={activeTab} setActiveTab={setActiveTab}/>
            <Player currentSong={currentSong} sdk={sdk} />
        </Flex>

      <Resizable
        defaultSize={{ width: 550 }}
        class='resizable'
        style={{
          background: 'var(--focus-a3)',
          borderLeft: '1px solid var(--gray-9)',
          marginLeft: 'auto',
        }}
        enable={{
          top: false,
          right: false,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}>

        <Chat sdk={sdk} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </Resizable>
    </Flex>
  )
}

export default HomePlaylist
