import React, { useRef, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Text,
  Flex,
    Center,
  Button,useDisclosure,
  Input,
  Box,
  Tooltip
} from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from '@chakra-ui/react'

import ChatLoading from "./ChatLoading";
import axios from "axios";
import { UserItem } from "./UserItem";
import { ChatState } from "../Context/ChatProvider";
import { Navigate,useNavigate } from "react-router-dom";
import { YourProfile } from "./UserComponents/YourProfile";
 
export const Navbar = ({hide,setHide}) => {
  const { user,token,chats,setChats,setSelectedChat,selectedChat,setToken,setUser } = ChatState();
  const [searchResult, setSearchResult] = useState([]);
  const searchDrawer = useDisclosure()   
  const profileDrawer = useDisclosure()   
  
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const btnRef = useRef()
  const profileRef= useRef()
  const toast = useToast()
  const navigate=useNavigate()
  


  function Logout() {
    console.log("logout working");
    localStorage.removeItem("userInfo")
    setToken("")
    setUser({})
    return window.location.assign("/")
    
   
  }
  function toggleHide() {
    setHide(!hide)
  }

  const handleSearch = async () => {
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
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const {data} = await axios.get(`${process.env.VITE_API_URL}/user/search?search=${search}`, config);
    
      setLoading(false);
      setSearch("")
      setSearchResult(data);
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
    setLoading(false)
  };

  const accessChat = async (userId) => {
    // console.log(userId);

    try {
      
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${process.env.VITE_API_URL}/chat`, { userId }, config);
      // console.log(data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setSearchResult([]);
      searchDrawer.onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <nav>
      <Box className="profile" display="flex" flexDirection='column'alignItems='center' gap='10px' position='relative'>
        <span><i className="fa-brands fa-rocketchat fa-flip fa-xl" ></i></span>
        <Tooltip label={hide?"Show Chats":"Hide Chats"}>
        <span className="menu"><i className="fa-solid fa-bars fa-lg" onClick={toggleHide}></i></span>
        </Tooltip>
        <Text as='i'  fontSize="md" position='absolute' left='130%'>ChatApp </Text>
      </Box>

      <Box className="draw" background='linear-gradient(#DDA26C,#D09FA4)'>
        <Drawer
          isOpen={searchDrawer.isOpen}
          placement="right"
          onClose={searchDrawer.onClose}
          finalFocusRef={btnRef}
          
        >
          <DrawerOverlay />
          <DrawerContent
background= 'linear-gradient(10deg, #EDF1F4, #C3CBDC)'>
            <DrawerCloseButton />
            <DrawerHeader>Search Users</DrawerHeader>

            <DrawerBody>
              <Box display="flex" pb={4}>
                <Input
                  size="sm"
                  placeholder="Search by name or email"
                  _placeholder={{color: 'black' }}
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button size='sm' bg='black' color='white' _hover={{ bg:"#1A202C"}}  onClick={handleSearch}>
                  Search
                </Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    handleFunction={accessChat}
                  />
                ))
              )}
            </DrawerBody>

            <DrawerFooter>
              <Button size='sm' colorScheme="red"  mr={3} onClick={searchDrawer.onClose} width='100%'>
                Close
              </Button>
              {/* <Button colorScheme="blue">Save</Button> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
       
  <YourProfile user={user} isOpen={profileDrawer.isOpen} onOpen={profileDrawer.onOpen} onClose={profileDrawer.onClose} profileRef={profileRef}/>
        
        


      </Box>
      <Box display="flex" position="relative" flexDirection='column' alignItems='center' gap='5px'>
      <Tooltip label={user.name} >
          <Avatar  mb='8px' size="xs" name={user.name} src={user ? user.pic : null} ref={profileRef} onClick={profileDrawer.onOpen}></Avatar>
        </Tooltip>
        <Tooltip label="Search Users">
        <Button size="sm" onClick={searchDrawer.onOpen} colorScheme="gray" ref={btnRef} display="flex" gap="10px" > <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }} ></i>{" "} </Button>
        </Tooltip>
        <Tooltip label="Logout">
          <Button size="sm" colorScheme="gray" onClick={Logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </Button>
        </Tooltip>
      </Box>
    </nav>
  );
};
