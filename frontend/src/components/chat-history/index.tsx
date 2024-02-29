import ChatHistorySearch from "./chat-history-search";
import ChatHistoryList from "./chat-history-list";
import { Separator } from "@/components/ui/separator";

const ChatHistory = () => {
  return (
    <div className="w-full flex flex-col h-full">
      <ChatHistorySearch />
      <Separator />
      <ChatHistoryList />
    </div>
  );
};

export default ChatHistory;
