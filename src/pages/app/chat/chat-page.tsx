import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChats } from "@/http/chat/get-chats";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

// interface Message {
//   id: number;
//   sender: string;
//   content: string;
//   timestamp: string;
// }

// interface Conversation {
//   id: number;
//   user: string;
//   lastMessage: string;
//   avatar: string;
// }

export function ChatPage() {
  const { data: chat, isLoading: isLoadingGetChats } = useQuery({
    queryKey: ["get-chats"],
    queryFn: async () => await getChats(),
  });

  // const [selectedConversation, setSelectedConversation] = useState<
  //   number | null
  // >(null);
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [newMessage, setNewMessage] = useState("");

  // const handleSendMessage = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newMessage.trim() === "") return;

  //   const newMsg: Message = {
  //     id: messages.length + 1,
  //     sender: "You",
  //     content: newMessage,
  //     timestamp: new Date().toLocaleTimeString(),
  //   };

  //   setMessages([...messages, newMsg]);
  //   setNewMessage("");
  // };

  return (
    <div className="mt-16 flex h-screen">
      {/* Conversation List */}
      <div className="w-fit border-r">
        {isLoadingGetChats ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-5rem)]">
              {chat?.map((chat) => {
                return chat.users.map((user, index) => {
                  if (index > 0) {
                    return (
                      <div
                        key={user.id}
                        className={cn(
                          "flex cursor-pointer items-center p-4 hover:bg-stone-100 dark:hover:bg-stone-800",
                        )}
                      >
                        <Avatar className="mr-3 h-10 w-10">
                          <AvatarImage
                            src={user.profilePicture!}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                        </div>
                      </div>
                    );
                  }
                });
              })}
            </ScrollArea>
          </>
        )}
      </div>

      {/* Chat Window */}
      {/* <div className="flex flex-1 flex-col">
        {selectedConversation ? (
          <>
            <div className="border-b bg-background p-4">
              <h2 className="text-xl font-semibold">
                {conversations.find((c) => c.id === selectedConversation)?.user}
              </h2>
            </div>
            <ScrollArea className="flex-1 p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 ${
                    msg.sender === "You" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg p-2 ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="mt-1 text-xs text-gray-500">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form
              onSubmit={handleSendMessage}
              className="border-t bg-background p-4"
            >
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="mr-2 flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-background">
            <p className="text-gray-500">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
}

{
  /* <div
key={user.id}
className={cn(
  "flex cursor-pointer items-center p-4 hover:bg-stone-100 dark:hover:bg-stone-800",
)}
>
<Avatar className="mr-3 h-10 w-10">
  <AvatarImage src={user.profilePicture!} alt={user.name} />
  <AvatarFallback>{user.name[0]}</AvatarFallback>
</Avatar>
<div>
  <h3 className="font-semibold">{user.name}</h3>
</div>
</div> */
}
