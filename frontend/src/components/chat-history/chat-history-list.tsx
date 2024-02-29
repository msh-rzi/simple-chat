import UserCard from "../user-card";
import Scrollbar from "@/components/scrollbar";
import { useFavoriteChats } from "@/hooks/zustand/useFavoriteChats";
import { useSelectedChats } from "@/hooks/zustand/useSelectedChat";
import { useEffect } from "react";
import { useChatList } from "@/hooks/zustand/useChatList";
import { cn } from "@/lib/utils";
import { getRooms } from "@/lib/fetch";
import { InfoType, useUserInfo } from "@/hooks/zustand/useUserInfo";

const ChatHistoryList = () => {
  const userInfo = useUserInfo((state) => state.info);
  const { users, addUserToChatList } = useChatList();
  const favorites = useFavoriteChats((state) => state.users);
  const { selectChat, user: selectedChat } = useSelectedChats();

  useEffect(() => {
    if (!selectedChat) selectChat("Choose someone to start chat...");
    if (userInfo?.id)
      getRooms({
        id: userInfo.id,
        username: userInfo.username,
      }).then((roomsList: InfoType[]) => {
        roomsList.forEach((c) => {
          addUserToChatList(c);
        });
      });
  }, []);

  return (
    <div className="w-full flex flex-col h-full">
      <Scrollbar className="[&>div]:flex [&>div]:flex-col ">
        {users
          .slice()
          .reverse()
          .map((h: InfoType) => (
            <UserCard
              {...h}
              key={h.username}
              onClick={() => selectChat(h.title)}
              pinned={favorites.includes(h.title)}
              className={cn(selectedChat === h.title && "bg-blue-200")}
            />
          ))}
      </Scrollbar>
    </div>
  );
};

export default ChatHistoryList;
