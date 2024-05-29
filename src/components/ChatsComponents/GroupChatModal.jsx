import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    Input,
    Box,
    useToast
  } from '@chakra-ui/react'
import { UserItem } from '../UserItem'
import axios from 'axios'
import { ChatState } from '../../Context/ChatProvider'
import { UserBadge } from './UserBadge'
import { json } from 'react-router-dom'
import { creategroup } from '../../../utils'

export const GroupChatModal = () => {
    const{user,token,setChats}=ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search, setSearch] = useState("")
    const [selectedGroupUsers, setSelectedGroupUsers] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [chatName, setChatName] = useState("")
    
    const toast= useToast()

    const handleSearch = async () => {
        console.log("search working");
        if (!search) {
          toast({
            title: "Please Enter something in search",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
          return;
        }
    
        try {
         
    
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
            const { data } = await axios.get(`${process.env.VITE_API_URL}/user/search?search=${search}`, config);
            console.log(data);
          setSearchResult(data)
       
         
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
        
      };

    const addToGroup = (user) => {
       if(selectedGroupUsers.includes(user)){
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
      }
        setSelectedGroupUsers(prev => {
           return[...prev,user]
       })
    }

    const removeFromGroup = (user) => {
       const remaining= selectedGroupUsers?.filter((ur) => {
           return ur._id !== user._id
           
       })
       setSelectedGroupUsers(remaining)
    }

  const handleSubmit = async () => {
      
    if (!chatName) {
      toast({
        title: "ChatName cannot be blank",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
        
        const finalUsers = selectedGroupUsers.map((u) => {
          return u._id;
        });
      
      try {
        const res = await creategroup(token, chatName, JSON.stringify(finalUsers))
        console.log(res);
        setSearch("")
        setChatName("")
        setSelectedGroupUsers([])
        setSearchResult([])
        setChats(prev => {
          return [...prev,res]
        })
        onClose()
      } catch (error) {
        console.log(error);
        toast({
          title: "Something went wrong",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      }
      


    }
    return (
      <>
        <Button size='sm' onClick={onOpen} colorScheme='gray'>+ New Group</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent background= 'linear-gradient(10deg, #EDF1F4, #C3CBDC)'>
            <ModalHeader display='flex' justifyContent='center'>New Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody display='grid' gap='10px' >
            <FormControl display='flex' gap='10px'>
                            <Input tupe='text' size='sm' placeholder='Enter Chat Name' value={chatName} onChange={(e) => { setChatName(e.target.value) }} />
                            
                        </FormControl>
                        <FormControl display='flex' gap='10px'>
                            <Input tupe='text' size='sm' placeholder='Search Users' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <Button size='sm' colorScheme='whatsapp' onClick={handleSearch}>Go</Button>
                        </FormControl>
                        <Box display='flex' columnGap='10px' rowGap='5px' flexWrap='wrap'>
                            {selectedGroupUsers?.map((user,ind) => {
                                return <UserBadge key={ind} user={user} removeFunction={() => { removeFromGroup(user) }} />
                           })}
                        </Box>
                        <Box>
                            {searchResult?.map((user, ind) => {
                                return <UserItem key={user._id} user={user} handleFunction={()=>addToGroup(user)}/>
                            })}
                        </Box>
            </ModalBody>
  
            <ModalFooter>
              <Button size='sm' colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button size='sm' colorScheme='whatsapp' onClick={handleSubmit}>Create Group</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
