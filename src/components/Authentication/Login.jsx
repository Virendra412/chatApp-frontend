import React, { useState } from 'react'
import {
    VStack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
  Button,
    useToast
} from "@chakra-ui/react";
  import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';

export const Login = () => {
  const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const toast = useToast();
    const {setToken}= ChatState()
    async function submitHandler() {
      try {
        setLoading(true);
        const sendData = {email: email, password: password};
        // console.log(sendData);
        const {data} = await axios.post(`${process.env.VITE_API_URL}/user/login`, sendData);
        console.log(data);
        localStorage.setItem('userInfo', data.token)
        localStorage.setItem('userData',JSON.stringify(data))
        toast({
          title: `Sucessfully Logged In`,
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
      setLoading(false)
    }

  return (
    <VStack>
     

      <FormControl id="loginEmail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input size="sm" type="email" placeholder="Enter Your Email"  _placeholder={{ color: 'black' }}
          variant='filled' onChange={(e)=>setEmail(e.target.value)}/>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl id="LoginPassword" isRequired>
        <FormLabel>Password</FormLabel>
        <Input size="sm" type="text" placeholder="Password"  _placeholder={{ color: 'black' }}
          variant='filled' onChange={(e)=>setPassword(e.target.value)}/>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
     
     
      <Button isLoading={loading} width="100%" style={{marginTop:15}} bg='black'
        color='white'
        _hover={{ bg:"#1A202C"}} onClick={submitHandler}>Login</Button>
    </VStack>
  )
}
