import { Chat } from "@/@types/chat";

interface getChatByIdRequest {
  id: string;
}

export async function getChatById({ id }: getChatByIdRequest) {
  try {
    const response = await fetch(`http://localhost:80/api/chats/${id}`);
    const data: Chat[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
