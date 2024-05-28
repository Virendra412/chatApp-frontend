import React, { useEffect } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Text,
  Flex,
  Center,
  Button,
  useDisclosure,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { UserItem } from "./UserItem";
import { fetchChats } from "../../utils";
import { MyChats } from "./ChatsComponents/MyChats";
import { GroupChatModal } from "./ChatsComponents/GroupChatModal";

export const AllChats = ({ fetchAgain, setFetchAgain, hide,setHide }) => {
  const { user, chats, setChats, token } = ChatState();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        // console.log("ALL Chats fetchingALL Chats");
        const chat = await fetchChats(token);
        setChats(chat);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    })();
  }, [user, fetchAgain]);
  // console.log(chats);
  return (
    <Box
      bg="#FEFEFE"
      className={hide ? "allChats hideBar" : "allChats"}
      display="flex"
      flexDirection="column"
      height="100%"
      borderTopStartRadius="10px"
      overflow="hidden" borderLeft='1px solid #c6c4c4' borderTop='1px solid #c6c4c4' minWidth="300px"
    >
      <Box
        bg="white"
        p="10px"
        height="50px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom='1px solid #c6c4c4'

      >
        <Text fontSize="md" as="b">
          Chats
        </Text>
        <GroupChatModal />
      </Box>
      <Box className="allChatsBody" flexGrow="1">
        <div>
          {chats?.map((chat, ind) => {
            return <MyChats key={chat._id} chatData={chat} hide={ hide} setHide={setHide}  />;
          })}
        </div>
      </Box>
    </Box>
  );
};
