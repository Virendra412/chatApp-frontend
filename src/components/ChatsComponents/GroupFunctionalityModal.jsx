import React, { useEffect } from 'react'
import  { useState } from 'react'
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
    useToast,
    Text,
    FormLabel,
    Tooltip
  } from '@chakra-ui/react'
import ChatLoading from '../ChatLoading'
import { UserBadge } from './UserBadge'
import { ChatState } from '../../Context/ChatProvider'
import { addToGroup, removeFromgroup, renameGroup } from '../../../utils'
import { UserItem } from '../UserItem'
import axios from 'axios'

export const GroupFunctionalityModal = ({ chatdata,fetchAgain,setFetchAgain}) => {
    const { user, token,selectedChat, setSelectedChat } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search, setSearch] = useState("")
    const [chatName, setChatName] = useState("")
    const [searchResult, setSearchResult] = useState([])
  const toast = useToast();
  useEffect(() => {
    setSearch("")
    setSearchResult([])
    onClose()
},[selectedChat])


  async function handleRemove(us) {
      console.log(chatdata.groupAdmin._id,user._id);
    if (chatdata.groupAdmin._id !== user._id &&user._id!==us._id) {
      toast({
        title: `You dont Have Permission`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"top-right",
      })
      
      return
    }


     try {
      const res = await removeFromgroup(token, us._id, selectedChat._id)
      
      setSelectedChat(res);
        setFetchAgain(!fetchAgain)
       
      onClose()
      toast({
        title: `${us.name} has been removed from Group`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:"top-right",
      })
     } catch (error) {
       onClose()
      toast({
        title: `Something went wrong, Cannot Delete User`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position:"top-right",
      })
     }
    
}

  async function UpdatechatName() {
    try {
      const res = await renameGroup(token, chatName, selectedChat._id)
      console.log(res);
      setFetchAgain(!fetchAgain)
      setSelectedChat(res);
      onClose()
      toast({
        title: `Group Name Updated sucessfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:"top-right",
      })
    } catch (error) {
      toast({
        title: `Something went wrong, Cannot update chatName`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position:"top-right",
      })
    }
   
}
   
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
      // console.log(data);
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
  
  const handleAddGroup = async (usr) => {
  try {
    const res = await addToGroup(token, usr._id, selectedChat._id)
    setSelectedChat(res)
    toast({
      title: `${usr.name} has been added in group`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
  } catch (error) {
    toast({
      title: "Something went wrong",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
  }
    
}

  return (
    <>
      {chatdata.isGroupChat && (
        <Tooltip hasArrow label="Edit Group" aria-label="Edit">
          <span onClick={onOpen}>
            {" "}
            <i className="fa-regular fa-pen-to-square fa-lg "></i>
          </span>
        </Tooltip>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background= 'linear-gradient(10deg, #EDF1F4, #C3CBDC)'>
          <ModalHeader display="flex" justifyContent="center">
            {chatdata.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="grid" gap="10px" >
            <Box display="flex" gap="5px" flexWrap="wrap">
              {chatdata.users.map((usr) => { if (usr._id !== user._id) { return ( <UserBadge key={usr._id} user={usr} removeFunction={() => handleRemove(usr)} /> ); } })}
            </Box>
            <FormControl display="flex" gap="10px">
              <Input size="sm" type="text" placeholder="Chat Name" value={chatName} onChange={(e) => { setChatName(e.target.value); }} ></Input>
              <Button size="sm" colorScheme="gray" onClick={UpdatechatName}>
                Update
              </Button>
            </FormControl>
            <FormControl display="flex" gap="10px">
              <Input tupe="text" size="sm" placeholder="Search Users to add" value={search} onChange={(e) => { setSearch(e.target.value); }} />
              <Button size="sm" colorScheme="gray" onClick={handleSearch}>
                Search
              </Button>
            </FormControl>

            <Box maxHeight="300px" overflowY="scroll">
              {searchResult?.map((usr, ind) => {
                if (!selectedChat.users.some(u => u._id === usr._id)) {
                  return <UserItem key={usr._id} user={usr} handleFunction={()=>{handleAddGroup(usr)} } />;
                }
              })}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              size="sm"
              colorScheme="red"
              mr={3}
              onClick={() => handleRemove(user)}
            >
              {" "}
              Leave Group{" "}
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

