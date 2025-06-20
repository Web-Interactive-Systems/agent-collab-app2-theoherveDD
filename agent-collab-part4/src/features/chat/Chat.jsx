import { Flex } from '@radix-ui/themes'
import ChatList from './ChatList'
import ChatPrompt from './ChatPrompt'

function Chat({ activeTab, setActiveTab }) {
  return (
    <Flex
      direction='column'
      gap='4'
      width='100%'
      height='100%'
      p='1'>
      <ChatList />
      <ChatPrompt activeTab={activeTab} setActiveTab={setActiveTab}/>
    </Flex>
  )
}

export default Chat
