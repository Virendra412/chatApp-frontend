import { Box, CloseButton, Text } from '@chakra-ui/react'
import React from 'react'

export const UserBadge = ({user,removeFunction}) => {
  return (
      <Box display='flex' justifyContent='space-between' p='2px 5px' bg='black' borderRadius='8px' width='fit-content' gap='4px' onClick={removeFunction}>
          <Text as='i' color='white'>{user.name}</Text>
          <CloseButton color='white' size='sm'  />
    </Box>
  )
}
