import { Chat } from "@/@types/chat";

export async function getChats() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const response = await fetch("http://localhost:80/api/chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Chat[] = await response.json();

  console.log(data);  

  return data;
}
