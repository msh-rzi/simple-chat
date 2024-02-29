import ChatWindow from "@/components/messages-panel";
import ChatProfile from "@/components/messages-panel/chat-profile";
import { Separator } from "@/components/ui/separator";

const ChatMain = () => {
  return (
    <div className="w-3/4 bg-background flex flex-col">
      <ChatProfile />
      <Separator />
      <ChatWindow />
    </div>
  );
};

export default ChatMain;
