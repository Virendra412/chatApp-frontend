import React, { useState } from "react";
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
  
  async function postDetails(pics) {
    console.log(pics);
    // setLoading(true);
    if (pics === undefined) {
      toast({
        title: "please select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setLoading(false);
      return;
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dhoha33eh");
      console.log(data);
      fetch("  https://api.cloudinary.com/v1_1/dhoha33eh/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setPic(data.url);
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setLoading(false);
        });
    }
    else {
      toast({
        title: "Image should have extension .jpg ,jpeg .png",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // setLoading(false);
    }
    // setLoading(false);
    return;
  }
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
          marginTop="10%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          rowGap="1rem"
        >
          <Box padding='1px' border='3px solid black' borderRadius='50%'>
            <Avatar width='150px' height='150px' name={user.name} src={user.pic} />
            </Box>

          <FormControl display= 'flex' alignItems='center'>
            <InputGroup border='1px solid black' borderRadius='7px'>
              <InputLeftAddon background='black' color='white' >Name:</InputLeftAddon>
              <Input value={name} onChange={(e)=>{setname(e.target.value)}} />
              </InputGroup>
          </FormControl>
          <FormControl display= 'flex' alignItems='center'>
            <InputGroup border='1px solid black' borderRadius='7px'>
              <InputLeftAddon background='black' color='white' >Email:</InputLeftAddon>
              <Input  value={email} onChange={(e)=>{setemail(e.target.value)}}  />
              </InputGroup>
          </FormControl>
         
          <FormControl id="pic" >
          <InputGroup border='1px solid black' borderRadius='7px' >
              <InputLeftAddon background='black' color='white' >Pic:</InputLeftAddon>
              <Input p={1.5}  type="file"   accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
              </InputGroup>
            
       
       
      </FormControl>

          
        </DrawerBody>

        <DrawerFooter>
          <Button
            size="sm"
            colorScheme="red"
            mr={3}
            onClick={onClose}
            
          >
            Close
          </Button>
          <Button colorScheme="blue" size='sm' onClick={userUpdate}>Update</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
