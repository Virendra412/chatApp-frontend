import axios from "axios";
const BASE_URL = process.env.VITE_API_URL

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzYzYjhhNWUxYTQ2YjJhNGVjMGNjOSIsImlhdCI6MTcxNTMwOTU5MCwiZXhwIjoxNzE1NzQxNTkwfQ.UQlBRxXUgsT9pdqit766_Iqom_c48aP6R-DdcLbfizA';




async function getCurrentUser(tk) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };

  const res = await axios.get(`${BASE_URL}/user/getuser`, config);
  return res.data;
}
async function fetchChats(tk) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  const res = await axios.get(`${BASE_URL}/chat`, config);

  return res.data;
}
async function fetchChatMessages(tk, chatId) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  
  const allmessages = await axios.get(
    `${BASE_URL}/message/${chatId}`,
    config
  );
  return allmessages.data;
}
async function sendMessage(tk, chatId, content) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  
  // const data={chatId:chatId}
  const res = await axios.post(
    `${BASE_URL}/message`,
    { chatId, content },
    config
  );
  return res.data;
}

async function updateUserInfo(tk,data) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };

  const res = await axios.post(`${BASE_URL}/user/update`, data,config);
  return res.data;
}

// --------------------------------------------------------GROUP CHAT API---------------------------------------------------------------------------------

async function creategroup(tk,chatName,userArr) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  
  const sampleData = 
  {
    "name":chatName,
    "users":userArr
  }
  
  const res = await axios.post(`${BASE_URL}/chat/group`,sampleData, config);
  return res.data;
}

async function removeFromgroup(tk,userId,chatId) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  const res = await axios.put(`${BASE_URL}/chat/removegroup`, { userId, chatId }, config);
  return res.data
}
async function renameGroup(tk,chatName,chatId) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  const res = await axios.put(`${BASE_URL}/chat/renameGroup`, { chatId, chatName }, config);
  return res.data
}
async function addToGroup(tk,userId,chatId) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  const res = await axios.put(`${BASE_URL}/chat/addgroup`, { chatId, userId }, config);
  return res.data
}

// ----------------------------------------------NOTIFICATION API--------------------------------------------------------------------------

async function addNotification(tk,mesid) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  const res = await axios.post(`${BASE_URL}/user/addNoti`, {msgId:mesid}, config);
  console.log(res.data);
  return res.data
}
async function getNotification(tk) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  const res = await axios.get(`${BASE_URL}/user/getNoti`, config);
  // console.log(res.data);
  return res.data
}

async function removeNotification(tk,chatId) {
  const config = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };
  const res = await axios.post(`${BASE_URL}/user/removeNoti`, {chatId}, config);
  // console.log(res.data);
  return res.data
}







function latestMessageDisplayer(str) {
  if (str.length > 20) {
    return `${str.slice(0,20)}...`
  }
  return str
}

export {
  getCurrentUser,
  updateUserInfo,
  fetchChats,
  getSender,
  fetchChatMessages,
  sendMessage,
  creategroup,
  isOwnMes,
  removeFromgroup,
  renameGroup,
  addToGroup,
  removeNotification,
  addNotification,
  getNotification,
  mesColour,
  isOwnMes2,
  isSenderFirstMessage,
  randomColorGiver,chatPic,latestMessageDisplayer
};



function isSenderFirstMessage(messages, i) {
  if (i === 0) {
    return true;
  }
  // console.log(messages[i].sender._id,messages[i - 1].sender._id);
  // console.log(i <= messages.length - 1 && messages[i].sender._id != messages[i - 1].sender._id)
  return (
    i <= messages.length - 1 &&
    messages[i].sender._id != messages[i - 1].sender._id
  );
}
const colors = ["violet", "orange", "blue", "red", "green", "brown","darkblue","black","#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", "#3366E6", "#999966", "#809980", "#E6FF80", "#1AFF33", "#999933", "#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#FF4D4D", "#99E6E6", "#6666FF"]



function randomColorGiver(groupChatUsers) {
  const randColor={}
  groupChatUsers.forEach((user, ind) => {
    randColor[user._id]=colors[ind]
  })
  return randColor
}

function isOwnMes(user, mes) {
  return user._id == mes.sender._id ? "flex-end" : "flex-start";
}
function isOwnMes2(user, mes) {
  return user._id == mes.sender._id ? "You" : mes.sender.name;
}

function mesColour(user, mes) {
  return user._id == mes.sender._id ? "white" : "rgb(201, 210, 251)";
}
function chatPic(chat, loggedUser) {
  if (chat.isGroupChat) {
    return null
  }
  
  return chat.users[0]?._id === loggedUser?._id ? chat.users[1].pic : chat.users[0].pic;
}
function getSender(loggedUser, users) {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
}