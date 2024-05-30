import React, { useEffect } from "react";
import {
  isDayChange,
  isOwnMes,
  isOwnMes2,
  isSenderFirstMessage,
  mesColour,
  mesDates,
  msgTime,
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
          <>
          <Box
            key={mes._id}
            position="relative"
            display="flex"
            flexDirection="column"
            bg="transparent"
            p="2px 10px"
            >
            {isDayChange(ind, messages) && <Box as='b'  textAlign='center' marginBlock='20px' borderBottom='1px solid grey' boxShadow="0px 2px 5px gray" bg='rgba(255, 255, 255, 0.8)'  padding='3px 10px' borderRadius="5px" alignSelf='center' fontSize='10px'>{ mesDates(mes.createdAt)}</Box>}
             
            <Box
              bg={mesColour(user, mes)}
              maxWidth="60%"
              borderRadius="5px"
              mt={isSenderFirstMessage(messages, ind) ? "15px" : "0px"}
              alignSelf={isOwnMes(user, mes)}
              p="0px 10px 2px 10px"
              boxShadow="2px 2px 5px gray"
              display='flex' alignItems='end' gap='1rem'
            >
              <Box>
                {mes.chat.isGroupChat &&
                  isSenderFirstMessage(messages, ind) && (
                    <Text
                      fontSize="11px"
                      as="b"
                      lineHeight="1"
                      color={randomUserColor[mes.sender._id]}
                    >
                      {" "}
                      {isOwnMes2(user, mes)}{" "}
                    </Text>
                  )}
                <Text key={mes._id} className="textmessage" lineHeight="1.5">
                  {mes.content}
                </Text>
              </Box>
              <Text fontSize="9px">{msgTime(mes.createdAt)}</Text>
            </Box>
            </Box>
            </>
        );
      })}
    </ScrollableFeed>
  );
};
