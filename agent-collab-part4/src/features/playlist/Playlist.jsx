import { Flex } from '@radix-ui/themes'
import PlaylistList from './PlaylistList'

function Chat({ activeTab, setActiveTab }) {
    return (
        <Flex
            direction='row'
            gap='4'
            width='100%'
            height='100%'
            p='1'>
            <PlaylistList activeTab={activeTab} setActiveTab={setActiveTab} />
        </Flex>
    )
}

export default Chat
