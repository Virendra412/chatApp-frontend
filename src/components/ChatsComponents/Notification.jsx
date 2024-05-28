import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Text } from '@chakra-ui/react'

export const Notification = ({ chatdata }) => {
    const { noti,selectedChat } = ChatState()
    const [notiCount, setNotiCount] = useState(0)
    
    
    
    useEffect(() => {
        // console.log("noti counter running again" + noti.length);
        let counter = 0
        noti.forEach(msg => {
            // console.log(msg.chat._id,chatdata._id);
            if (msg.chat._id == chatdata._id) {
                counter += 1
               
            }

        })  
        
        setNotiCount(counter)
    },[noti])
    
  
    return (<>
    
        {notiCount > 0 && <Box width='17px' height='17px' borderRadius='50%' bg='black' display='grid' placeContent='center'><Text as='b' color='white' fontSize='xx-small'>{ notiCount}</Text></Box>}
        </>
  )
}
