import ChatHistory from "@/components/chat-history";
import Profile from "@/components/profile";
import { Separator } from "@/components/ui/separator";

const UsersPanel = () => {
  return (
    <div className="w-1/4 flex flex-col items-start min-w-60">
      <Profile />
      <Separator />
      <ChatHistory />
    </div>
  );
};

export default UsersPanel;
