import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Spinner
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { px } from "framer-motion";
import { Login } from "../components/Authentication/Login";
import { SignUp } from "../components/Authentication/SignUp";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate,Navigate } from "react-router-dom";
import ChatLoading from "../components/ChatLoading";
const HomePage = () => {
  const { user,gettingUserInfo } = ChatState();
   

  const navigate = useNavigate()

  
  if (user.name) {
    console.log(`current User is ${user.name}`);
    return <Navigate to="/chats"/>
  } 

   


    return (
      <>
        {gettingUserInfo?  <Box height="100vh" display="flex" alignItems="center" justifyContent="center" >
  <Spinner size='xl'/>
        </Box> :
  <Box className="formSection">
  <Text fontSize='4xl' as='b' color='black'><i className="fa-brands fa-rocketchat  fa-md" ></i> ChatApp</Text>
  <Box width='100%' maxWidth='500px' padding='20px' bg='white' borderRadius='5px' boxShadow='0px 0px 10px black'>
    <Tabs isFitted size='md' variant='soft-rounded' >
      <TabList paddingInline='50px'>
        <Tab _selected={{ color: 'white', bg: 'black' }} border='1px solid black'>Login</Tab>
        <Tab _selected={{ color: 'white', bg: 'black' }} border='1px solid black'>SignUp</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <SignUp />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
</Box>
  }
        
      </>
    );
  };

export default HomePage;