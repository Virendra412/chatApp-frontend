import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Avatar,
    Button,
    Text
} from '@chakra-ui/react'

export const YourProfile = ({user,isOpen, onOpen, onClose, profileRef}) => {
  return (
    <Drawer
    isOpen={isOpen}
    placement="right"
    onClose={onClose}
    finalFocusRef={profileRef}
    
  >
    <DrawerOverlay />
    <DrawerContent
background= 'linear-gradient(10deg, #EDF1F4, #C3CBDC)'>
      <DrawerCloseButton />
      <DrawerHeader>Profile</DrawerHeader>

      <DrawerBody display='flex' flexDirection='column' alignItems='center'>
                  <Avatar size='xl' name={user.name} src={user.pic} />
                  <Text fontSize='2xl' alignSelf='start'>{ user.name}</Text>
                  <Text fontSize='2xl' alignSelf='start'>{ user.email}</Text>
      </DrawerBody>

      <DrawerFooter>
        <Button size='sm' colorScheme="red"  mr={3} onClick={onClose} width='100%'>
          Close
        </Button>
        {/* <Button colorScheme="blue">Save</Button> */}
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}
