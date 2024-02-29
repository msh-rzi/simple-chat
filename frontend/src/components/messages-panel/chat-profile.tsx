import { chatProfileData } from "@/fake-data/user-data";
import UserCard from "../user-card";
import { Heart } from "@/svg/heart";
import { FormkitSearch } from "@/svg/search";
import IconButton from "@/components/icon-button";
import { cn } from "@/lib/utils";
import { useFavoriteChats } from "@/hooks/zustand/useFavoriteChats";
import { useSelectedChats } from "@/hooks/zustand/useSelectedChat";

const ChatProfile = () => {
  const selectedChat = useSelectedChats((state) => state.user);
  const {
    users: favorites,
    addUserToFavorite,
    removeUserFromFavorite,
  } = useFavoriteChats();

  const isFavorite = favorites.includes(selectedChat);

  return (
    <div className="w-full h-16 bg-background flex items-center">
      <div className="flex-1">
        <UserCard slot="div" {...chatProfileData} title={selectedChat} />
      </div>
      {!selectedChat.includes("start") && (
        <div className="w-min flex items-center justify-center pr-4">
          <IconButton onClick={() => addUserToFavorite("salam")}>
            <FormkitSearch width={25} height={25} />
          </IconButton>
          <IconButton
            onClick={() => {
              if (favorites.includes(selectedChat))
                removeUserFromFavorite(selectedChat);
              else addUserToFavorite(selectedChat);
            }}
          >
            <Heart
              width={25}
              height={25}
              className={cn(isFavorite && "fill-red-500")}
            />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ChatProfile;
