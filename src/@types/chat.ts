import { User } from "./user";

interface Message {
  id: string;
  content: string;
  sentAt: string;
  userId: string;
  userName: string;
}

export interface Chat {
  chatId: string
  createdAt: string
  users: User[]
  messages: Message[]
} 
