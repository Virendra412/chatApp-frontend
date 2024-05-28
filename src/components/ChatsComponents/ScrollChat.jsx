import React, { useEffect } from "react";
import {
  isOwnMes,
  isOwnMes2,
  isSenderFirstMessage,
  mesColour,
  randomColorGiver,
} from "../../../utils";
import { Box, Text } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/ChatProvider";
import styled from "styled-components";

export const ScrollChat = ({ messages }) => {
  const { user } = ChatState();
  const { selectedChat } = ChatState();
  var randomUserColor;

  if (selectedChat._id) {
    randomUserColor = randomColorGiver(selectedChat.users);
  }

  return (
    <ScrollableFeed className="scrollChat">
      {messages?.map((mes, ind) => {
        return (
          <Box
            key={mes._id}
            position="relative"
            display="flex"
            flexDirection="column"
            bg="transparent"
            p="2px 10px"
          >
            <Box
              bg={mesColour(user, mes)}
              maxWidth="60%"
              borderRadius="5px"
              mt={isSenderFirstMessage(messages, ind) ? "15px" : "0px"}
              alignSelf={isOwnMes(user, mes)}
              p="0px 10px 2px 10px" boxShadow='2px 2px 5px gray'
            >
              {/* {console.log(mes.chat.isGroupChat)} */}
              {mes.chat.isGroupChat && isSenderFirstMessage(messages, ind) && (
                <Text
                  fontSize="11px"
                  as="b"
                  lineHeight="1"
                  color={randomUserColor[mes.sender._id]}
                >
                  {isOwnMes2(user, mes)}
                </Text>
              )}
              <Text key={mes._id} className="textmessage" lineHeight="1.5">
                {mes.content}
              </Text>
            </Box>
          </Box>
        );
      })}
    </ScrollableFeed>
  );
};
