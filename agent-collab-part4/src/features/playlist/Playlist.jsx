import { Flex } from '@radix-ui/themes'
import PlaylistList from './PlaylistList'

function Chat({ currentSong, setCurrentSong,  activeTab, setActiveTab }) {
    return (
        <Flex
            direction='row'
            gap='4'
            width='100%'
            height='100%'
            p='1'>
            <PlaylistList currentSong={currentSong} setCurrentSong={setCurrentSong} activeTab={activeTab} setActiveTab={setActiveTab} />
        </Flex>
    )
}

export default Chat
