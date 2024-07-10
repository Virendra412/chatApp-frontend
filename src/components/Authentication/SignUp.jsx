import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  useToast,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [pic, setPic] = useState("");
  const toast = useToast();
  const { setToken } = ChatState();

  function popToast(status, msg) {
    return( toast({
      title: msg,
      status: status,
      duration: 5000,
      isClosable: true,
      position:"top-right",
    }))
  }
  async function postDetails(pics) {
    
   
    if (pics === undefined) {
      toast({
        title: "please select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      return;
    }

    if ( pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dhoha33eh");
      console.log(data);
      setLoading(true)
      fetch("https://api.cloudinary.com/v1_1/dhoha33eh/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => { console.log(data); setPic(data.url); setLoading(false); })
        .catch((err) => {
          console.log(err);
          setLoading(false);
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
      
    }
    
    return;
  }

  async function submitHandler() {
    try {
      // setLoading(true);
      if (password !== confirmpass) {
        toast({
          title: `Password should be same`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position:"top-right",
        })
        return
      }
      
      const sendData = { name: name, email: email, password: password, pic: pic };
      console.log(sendData);
      const {data} = await axios.post(`${process.env.VITE_API_URL}/user/register`, sendData);
      console.log(data);
      localStorage.setItem('userInfo',data.token)
      toast({
        title: `User Registered Sucessfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position:"top-right",
      })
      setToken(data.token)
    } catch (error) {
      console.log(error);
      toast({
        title: `${error.response.data.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position:"top-right",
      })
    }
  }

  return (
    
    <VStack >

      <Avatar name="Unknown" src={pic?pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFPIwN3oGGuOAJ4FnzlK5w-QFzI80HH7SdC2TJfi_VMw&s"}></Avatar>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input size='sm' 
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          _placeholder={{ color: 'black' }}
          variant='filled'
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input size='sm'  
          type="email"
          variant='filled'
          placeholder="Enter Your Email"
          _placeholder={{color: 'black' }}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl id="Password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input size='sm' 
          type="text"
          variant='filled'
          placeholder="Enter Password"
          _placeholder={{color: 'black' }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm password</FormLabel>
        <Input size='sm' 
          type="password" autoComplete="false"
          variant='filled'
          placeholder="Enter Your Password again"
          _placeholder={{color: 'black' }}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl id="pic" >
        <FormLabel>Upload your Picture</FormLabel>
        <Input size='sm' 
          p={1.5}
          type="file"
          variant='filled'
          placeholder="Select your Image"
          _placeholder={{color: 'black' }}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <Button
        isLoading={loading}
        loadingText="Submitting Data"
        width="100%"
        style={{ marginTop: 25 }}
        // colorScheme="blue"
        bg='black'
        color='white'
        _hover={{ bg:"#1A202C"}}
        onClick={submitHandler}
      >
        SignUp
      </Button>
      </VStack>
      
  );
};

