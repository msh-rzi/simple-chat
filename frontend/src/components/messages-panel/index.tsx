import MessagingZone from "@/components/messages-panel/messaging-zone";
import { Separator } from "@/components/ui/separator";
import MessageList from "./message-list";
import { useUserInfo } from "@/hooks/zustand/useUserInfo";
import { useSelectedChats } from "@/hooks/zustand/useSelectedChat";
import { useSocket } from "@/hooks/zustand/useSocket";

const ChatWindow = () => {
  const { info } = useUserInfo();
  const { user } = useSelectedChats();
  const { socket } = useSocket();

  if (!info?.username || !socket) return null;

  const handleSendMessage = (message: string) => {
    // Check if the message is not empty
    if (message.trim() === "") {
      console.log("Message is empty. Please enter a message.");
      return;
    }

    // Check if a user is selected
    if (!user) {
      console.log("Select someone first");
      return;
    }

    // // Emit a private message to the server
    socket.emit("private_message", {
      targetUserId: user,
      message,
    });
    // Provide user feedback or update UI if necessary
    console.log("Message sent successfully");
  };

  return (
    <>
      <div className="flex-1 flex flex-col items-end justify-end bg-gray-200 text-sm">
        <MessageList userInfo={info} socket={socket} />
      </div>
      <Separator />
      <MessagingZone getMessage={(m) => handleSendMessage(m)} />
    </>
  );
};

export default ChatWindow;
