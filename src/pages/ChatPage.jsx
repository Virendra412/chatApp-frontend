import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { ChatState } from "../Context/ChatProvider";
import { AllChats } from "../components/AllChats";
import { SingleChat } from "../components/SingleChat";
import { Box,Spinner } from "@chakra-ui/react";
const ChatPage = () => {
  const { user,gettingUserInfo } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)
  const [hide, setHide] = useState(true)
  return (
    <>
   
        <Box className="chatpage" height="100vh" display="flex">
      {user._id && <Navbar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} hide={ hide} setHide={setHide}/>}
      <Box display="flex" className="Chatbox" flexGrow="1" overflow='hidden' position='relative' pt='30px' bg='#f3f3f3'>
        {user._id && <AllChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} hide={ hide} setHide={setHide} />}
        {user._id && <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
      </Box>
    
     
    </>
  );
};
export default ChatPage;
