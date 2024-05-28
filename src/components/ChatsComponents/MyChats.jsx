import React from 'react'
import { Avatar, AvatarBadge, AvatarGroup, Box, Text } from '@chakra-ui/react'
import {chatPic, getSender, latestMessageDisplayer, removeNotification} from '../../../utils'
import { ChatState } from '../../Context/ChatProvider'
import { Notification } from './Notification'


export const MyChats = ({ chatData,hide,setHide }) => {
  const { user, setSelectedChat, selectedChat,token,setNoti } = ChatState()
  
  async function selectedChatHandler() {
    const getnoti = await removeNotification(token, chatData._id)
    // console.log(getnoti.notif);
  setNoti(getnoti.notif)
  setSelectedChat(chatData);
 
  setHide(!hide); 
}


  return (
    <Box bg={chatData._id == selectedChat._id ? "#EBEBEB" : "#FEFEFE"} display='flex' flexWrap='nowrap' justifyContent='space-between' alignItems='center' p='5px 25px 5px 10px' columnGap='15px' borderBlockEnd='1px solid #EEEEEE' className='userItem' onClick={selectedChatHandler} minWidth='300px' position='relative' width='100%'>
      <Box display='flex' alignItems='center' gap='10px'>  
      <Avatar size='sm' name={chatData.chatName} src={chatPic(chatData, user)} />
          <Box  display='flex' flexDirection='column' flexWrap='nowrap' className="userInfo">
              <Text as='b' fontSize='l'> {!chatData.isGroupChat ? getSender(user, chatData.users) : chatData.chatName}</Text>
              <Text as='i' fontSize='sm' whiteSpace='nowrap'>{chatData.latestMessage?latestMessageDisplayer(chatData.latestMessage.content):"no messages" }</Text>
              
             
        </Box>
        </Box>  
      <Notification chatdata={chatData}/>
    </Box>
  )
}
