import { onAgent } from '@/actions/agent'
import { styled } from '@/lib/stitches'
import {$chatAgents, $messages, $playlists, addMessage, addTrackInPlaylist, updateMessages, createPlaylist} from '@/store/store'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Button, Flex, TextArea } from '@radix-ui/themes'
import { useRef, useState } from 'react'
import { AgentMenu } from './AgentMenu'
import { AgentSelect } from './AgentSelect'
import { useStore } from '@nanostores/react'
import { isEmpty } from 'lodash'
import { extractJSONString } from '@/lib/json.js'
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

import Playlist from "@/pages/Playlist.jsx";

const PromptContainer = styled(Flex, {
  width: '100%',
  padding: '12px 18px',
  borderRadius: '18px',
  background: 'var(--accent-2)',
})

const PromptArea = styled(TextArea, {
  width: '100%',
  boxShadow: 'none',
  outline: 'none',
  background: 'none',
  '& textarea': {
    fontSize: '1.1rem',
    fontWeight: 450,
  },
})





function constructCtxArray(originalArray) {
  const result = []
  if (originalArray.length > 3) result.push(originalArray.at(-3), originalArray.at(-2))
  if (originalArray.length > 1) result.push(originalArray[1])
  if (originalArray.length > 0) result.push(originalArray[0])
  return result
}

function ChatPrompt({ sdk, activeTab, setActiveTab }) {
  const promptRef = useRef(null)
  const [isPromptEmpty, setIsPromptEmpty] = useState(true)

  const chatAgents = useStore($chatAgents)
  const messages = useStore($messages)
  const playlist = useStore($playlists)

  const onTextChange = () => {
    const val = promptRef.current.value || ''
    setIsPromptEmpty(val.trim().length === 0)
  }

  const onSendPrompt = async () => {
    const prompt = promptRef.current.value
    console.log('onSendPrompt', prompt);

    addMessage({
      role: 'user',
      content: prompt,
      id: Math.random().toString(),
    })

    const messages = $messages.get()

    const contextInputs = constructCtxArray(messages);


    // AI response
    const response = {
      role: 'assistant',
      content: '',
      id: Math.random().toString(),
      completed: false, // not complete yet
    }

    addMessage(response)

    const steps = isEmpty(chatAgents) ? [null] : chatAgents

    for (let i = 0, len = steps.length; i < len; i++) {
        const agent = steps[i]
      const spotifyTracks = [];

         let cloned = $messages.get()

        console.log("cloned",cloned[cloned.length-2])


          sdk.search(cloned[cloned.length-2].content, ['playlist'], { limit: 1 })
              .then(async result => {
                const playlistsUnclean = result.playlists.items;

                const playlistsNoSlice = playlistsUnclean.filter(item => item !== null);

                const playlists = playlistsNoSlice.slice(playlistsNoSlice.length-2);

                console.log("playlists", playlists);
                for (const playlist of playlists) {

                  const fullPlaylist = await sdk.playlists.getPlaylist(playlist.id);

                  console.log(playlist.id)

                  fullPlaylist.tracks.items.forEach((track) => {
                    spotifyTracks.push(`id : ${track.track.id} ${track.track.name} (${track.track.artists.map(a => a.name).join(', ')})`);


                  });
                }
                console.log(spotifyTracks);

                const SpotifyReduce = spotifyTracks.reduce((acc, track) => acc + ', ' + track);

                const fullPrompt = `The theme is "${prompt || ''}". Below are example tracks in this genre, each formatted as: ", id : <Spotify ID> <Track Title> (<Artist>)", and separated by commas. Make sure to extract the correct Spotify ID that matches the track title and artist that follow it. Do not confuse IDs between tracks — each ID corresponds only to the track that immediately follows it. If the provided tracks seem irrelevant, and an artist is mentioned, prioritize tracks that best represent that artist. => ${SpotifyReduce || ''}`;
                console.log(fullPrompt);

                // call agent
                const stream = await onAgent({ prompt: fullPrompt, agent, contextInputs })
                for await (const part of stream) {
                  const token = part.choices[0]?.delta?.content || ''
                  const last = cloned.at(-1)
                  cloned[cloned.length - 1] = {
                    ...last,
                    content: last.content + token,
                  }

                  console.log(cloned)

                  updateMessages([...cloned])
                }

                const last = cloned.at(-1)

                cloned[cloned.length - 1] = {
                  ...last,
                  completed: true,
                }

                const NewJson = extractJSONString(last.content);

                // Gestion des différentes fonctions sur les playlists.

                // Add one Track

                if (agent.title === "AddOneTrack") {
                  addTrackInPlaylist(NewJson, activeTab);

                  console.log(activeTab)
                  console.log(NewJson)
                }

                // Create New Playlist
                if (agent.title === "CreatePlaylist") {
                  createPlaylist(NewJson);
                }



                // add next prompt to chat
                if (steps.length > 0 && i !== steps.length - 1) {
                  cloned = [
                    ...cloned,
                    {
                      role: 'assistant',
                      content: '',
                      id: Math.random().toString(),
                      completed: false,
                    },
                  ]
                }

                updateMessages([...cloned])
              })
              .catch(err => {
                console.error('Erreur lors de la recherche', err);
              });

      console.log('spotifyTracks:', spotifyTracks);
      console.log("fullPrompt", fullPrompt);



    }

    promptRef.current.value = ''
    setIsPromptEmpty(true)

  }



  return (
    <Flex
      justify='center'
      mt='auto'
      width='100%'>
      <PromptContainer
        align='center'
        direction='column'>
        <PromptArea
          ref={promptRef}
          id='Todo'
          placeholder='Donne un mood, une émotion, autres ...'
          onChange={onTextChange}
          onKeyDown={(e) => {
            const canSend = !isPromptEmpty && e.key === 'Enter'
            const mod = e.metaKey || e.ctrlKey || e.altKey || e.shiftKey
            if (canSend && !mod) {
              // Prevent default behavior of Enter key
              e.preventDefault()
              onSendPrompt()
            }
          }}
        />
        <Flex
          justify='start'
          align='center'
          width='100%'>
          <Flex
            justify='start'
            align='center'
            width='100%'>
            {/* TODO Add Agent Select Menu */}
            <AgentSelect />
            <AgentMenu />
          </Flex>
        </Flex>
        <Flex
          justify='end'
          width='100%'>
          <Button
            disabled={isPromptEmpty}
            onClick={onSendPrompt}>
            <PaperPlaneIcon />
          </Button>
        </Flex>
      </PromptContainer>
    </Flex>
  )
}

export default ChatPrompt
