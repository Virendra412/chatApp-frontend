import React from 'react'
import { Avatar, AvatarBadge, AvatarGroup, Box, Center, Text } from '@chakra-ui/react'

export const UserItem = ({ user, handleFunction }) => {
  
  return (
      <Box className='userItem' display='flex' alignItems='center' gap='10px' p='5px 10px' bg='#EBEBEB' mb='5px' borderRadius='5px' onClick={()=>handleFunction(user._id)}>
          <Avatar  size='sm' name={user.name} src={user.pic} />
          <Box display='flex' flexDirection='column' className="userInfo">
              <Text as='b' fontSize='l'>{user.name}</Text>
              <Text as='i' fontSize='sm'>Email: {user.email}</Text>
              
             
        </Box>
    </Box>
  )
}
