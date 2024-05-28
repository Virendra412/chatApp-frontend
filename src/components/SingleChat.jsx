import React, { useEffect, useState } from "react";
import { addNotification, chatPic, fetchChatMessages, getSender, isOwnMes, mesColour, sendMessage, } from "../../utils";
import { Box, Text, useToast, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputRightElement, InputGroup, Center, Spinner, Avatar, InputRightAddon, } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { ScrollChat } from "./ChatsComponents/ScrollChat";
import { io } from "socket.io-client";
import { GroupFunctionalityModal } from "./ChatsComponents/GroupFunctionalityModal";
import { SenderProfile } from "./UserComponents/SenderProfile";

var socket, selectChatCompare;

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, chats, setChats, token, selectedChat,setNoti,noti } = ChatState();
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  // console.log(`chat fetch status${fetchAgain}`);

  //   console.log(`socket connected ${socketConnected}`);

  useEffect(() => {
    socket = io("https://chatapp-backend-k5ml.onrender.com", { withCredentials: true });

    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    if (selectedChat._id) {
      (async () => {
        setLoading(true);

        const mes = await fetchChatMessages(token, selectedChat._id);
        
        socket.emit("join chat", selectedChat._id);
        setMessages(mes);
        setLoading(false);
        selectChatCompare = selectedChat;
      })();
    }
  }, [selectedChat, fetchAgain]);

  const profileHandler = () => {
    
    setShowProfile(!showProfile);
  };

  async function submitHandler(event) {
    if (event.type == "keydown" && event.key !== "Enter") return;

    if (textMessage.length > 0) {
      const res = await sendMessage(token, selectedChat._id, textMessage);
     
      // setFetchAgain((prev) => !prev);
      setMessages((prev) => {
        return [...prev, res];
      });
      setTextMessage("");
      socket.emit("sendMessage", res);
    }
  }

 
  

  useEffect(() => {
    // console.log("notification lenght"+noti.length);
    socket.on("received", async(mes) => {
      if (
        !selectChatCompare || 
        selectChatCompare._id !== mes.chat._id
      ) {
        await addNotification(token, mes._id)
        console.log("notification lenght"+noti.length);
        setNoti(cur=>[...cur,mes])
      } else {
        setMessages((prev) => {
          console.log("messages has been recieved fetch chat again");
          return [...prev, mes];
       
        });
      }
    });
    return () => {
      socket.off("received");
    };
  });

  return (
    <>
      {selectedChat._id ? (
        <Box
          position="relative"
          background="url(https://r4.wallpaperflare.com/wallpaper/276/342/362/white-wood-texture-abstract-wallpaper-c90078ad21eaedcb76f7789f6021d68d.jpg)"
          bgSize="cover"
          display="flex"
          flexDirection="column"
          flexGrow="1"
          className="singleChat"
          paddingBlockEnd="10px"
          borderTop="1px solid #c6c4c4"
          overflow="hidden"
        >
          <Box
            p="10px"
            bg="white"
            borderBottom="1px solid #c6c4c4"
            display="flex"
            alignItems="center"
            gap="15px"
            height="50px"
            justifyContent="space-between"
            paddingInlineEnd="3%"
          >
            <Box display="flex" alignItems="center" gap="15px">
              <Avatar
                size="sm"
                boxShadow="0px 0px 6px grey"
                name={
                  !selectedChat.isGroupChat
                    ? getSender(user, selectedChat.users)
                    : selectedChat.chatName
                }
                src={chatPic(selectedChat, user)}
                onClick={profileHandler}
              />
              <Box>
                <Text fontSize="sm" as="b">
                  {" "}
                  {!selectedChat.isGroupChat
                    ? getSender(user, selectedChat.users)
                    : selectedChat.chatName}{" "}
                </Text>
                {selectedChat.isGroupChat && (
                  <Text fontSize="xs">
                    {selectedChat.users.map((u) => u.name).join(",")}
                  </Text>
                )}
              </Box>
            </Box>
            <GroupFunctionalityModal
              chatdata={selectedChat}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          </Box>
          {!selectedChat.isGroupChat && (
            <SenderProfile
              imageUrl={chatPic(selectedChat, user)}
              showProfile={showProfile}
              handleFunction={profileHandler}
            />
          )}
          <Box flexGrow="1" height="80%" display="grid">
            {!loading ? (
              <ScrollChat messages={messages} />
            ) : (
              <Spinner
                size="md"
                color="black"
                thickness="2px"
                margin="auto"
                placeContent="center"
              />
            )}
          </Box>
          <FormControl
            display="flex"
            width="95%"
            borderRadius="7px"
            alignSelf="center"
          >
            <InputGroup>
              <Input
                id="chatInput"
                type="text"
                variant="outline"
                bg="white"
                size="md"
                placeholder="Type a message here"
                value={textMessage}
                onKeyDown={submitHandler}
                onChange={(e) => {
                  e.preventDefault();
                  setTextMessage(e.target.value);
                }}
              />
              <InputRightAddon bg="darkgray" onClick={submitHandler}>
                <i className="fa-solid fa-paper-plane fa-lg"></i>
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        </Box>
      ) : (
        <Box
          flexGrow="1"
          bg="#E5DDD5"
          d="grid"
          placeContent="center"
          borderTopStartRadius="10px"
        >
          <Text fontSize="2xl" textAlign="center">
            Start chat
          </Text>
        </Box>
      )}
    </>
  );
};
