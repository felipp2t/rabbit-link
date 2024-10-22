import { UUID } from "crypto";

interface createChatRequest {
  token: string;
  userId: UUID;
}

export async function createChat({ userId, token }: createChatRequest) {
  try {
    const response = await fetch("http://localhost:80/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
