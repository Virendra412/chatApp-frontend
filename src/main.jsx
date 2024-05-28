import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ChatProvider } from "./Context/ChatProvider";
import { BrowserRouter, Router } from "react-router-dom";
// console.log(process.env.VITE_API_URL);
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
    </BrowserRouter>
    </>
);
