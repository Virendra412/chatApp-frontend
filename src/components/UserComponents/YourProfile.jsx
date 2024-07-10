import React, { useEffect, useState } from "react";
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
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  FormControl,
  FormLabel,
  Box,
  CheckboxGroup,
  useToast
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { updateUserInfo } from "../../../utils";

export const YourProfile = ({ user, isOpen, onOpen, onClose, profileRef }) => {
  const [name, setname] = useState(user.name)
  const [email, setemail] = useState(user.email)
  const [pic, setPic] = useState(user.pic)
  const [isloading, setIsloading] = useState(false)
const toast= useToast()
  const { token,setToken,setUser } = ChatState();

  const data = {
    id: user._id,
    name,email,pic
  }

  async function userUpdate() {
    const result = await updateUserInfo(token, data)
    // console.log(result);
    localStorage.setItem('userInfo',result.token)
    window.location.reload()
  }
  function Logout() {
    console.log("logout working");
    localStorage.removeItem("userInfo")
    setToken("")
    setUser({})
    return window.location.assign("/")
    
   
  }
  
  async function postDetails(pics) {
    console.log(pics);
    
    if (pics === undefined) { toast({ title: "please select an Image", status: "warning", duration: 5000, isClosable: true, position: "bottom", }); return; }
    if ( pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dhoha33eh");
      console.log(data);
      setIsloading(true)
      fetch("  https://api.cloudinary.com/v1_1/dhoha33eh/image/upload", { method: "post", body: data, })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setPic(data.url);
          setIsloading(false)
        })
        .catch((err) => {
          console.log(err);
          setIsloading(false)
        });
    }
    else { toast({ title: "Image should have extension .jpg ,jpeg .png", status: "warning", duration: 5000, isClosable: true, position: "top", }); }
   
    return;
  }

  useEffect(() => {
    setname(user.name)
    setemail(user.email)
    setPic(user.pic)
  }, [isOpen])
  

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={profileRef}
    >
      {/* background="linear-gradient(10deg, #EDF1F4, #C3CBDC)" */}
      <DrawerOverlay />
      <DrawerOverlay
        background="rgba(155,255,255,0.1)"
        backdropFilter="blur(2px)"
      />
      <DrawerContent background="linear-gradient( #C3CBDC,#C3CBDC, #EDF1F4)">
        <DrawerCloseButton />
        <DrawerHeader>Profile</DrawerHeader>

        <DrawerBody
          
          display="flex"
          flexDirection="column"
          alignItems="center"
          rowGap="1rem"
        >
          <Box padding="1px" border="3px solid black" borderRadius="50%">
            <Avatar
              width="150px"
              height="150px"
              name={user.name}
              src={pic}
            />
          </Box>

          <FormControl display="flex" alignItems="center" marginTop={10}>
            <InputGroup border="1px solid black" borderRadius="7px">
              <InputLeftAddon background="black" color="white">
                Name:
              </InputLeftAddon>
              <Input
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <InputGroup border="1px solid black" borderRadius="7px">
              <InputLeftAddon background="black" color="white">
                Email:
              </InputLeftAddon>
              <Input
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="pic">
            <FormLabel className="fileLabel"><Box display='inline-block' marginInline={3}><i className="fa-solid fa-upload"></i></Box>Choose a pic</FormLabel>
            <Input p={1.5} type="file" className="inputfile" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
          </FormControl>
          <Button alignSelf='start' onClick={Logout} >Logout</Button>
        </DrawerBody>

        <DrawerFooter display='flex' flexDirection='column' alignItems='start' rowGap='10px'>
          <Button isLoading={isloading} loadingText="" colorScheme="blue" size="sm" width='100%' onClick={userUpdate}> Update </Button>
          <Button isLoading={isloading} loadingText="" size="sm" colorScheme="red" mr={3} width='100%' onClick={onClose}> Close </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
