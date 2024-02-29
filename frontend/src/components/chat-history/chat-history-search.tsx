import { Input } from "@/components/ui/input";
import { getAllContacts } from "@/lib/fetch";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader } from "@/svg/loader";
import useClickOutside from "@/hooks/useClickOutside";
import { useChatList } from "@/hooks/zustand/useChatList";
import { useSelectedChats } from "@/hooks/zustand/useSelectedChat";
import { InfoType } from "@/hooks/zustand/useUserInfo";

const ChatHistorySearch = () => {
  const { addUserToChatList, users } = useChatList();
  const { selectChat } = useSelectedChats();

  const dropdownRef = useClickOutside(closeDropdown);
  const [contacts, setContacts] = useState<InfoType[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<InfoType[]>([]);
  const [open, setOpen] = useState(false);
  const onFocus = async () => {
    const data = await getAllContacts();
    setContacts(data);
    setFilteredContacts(data);
    setOpen(true);
  };
  function closeDropdown() {
    setOpen(false);
  }
  const onItemClick = (user: InfoType) => {
    closeDropdown();
    const isExist = users.find((u) => u.title === user.title);
    if (!isExist) {
      addUserToChatList(user);
      selectChat(user.title);
    }
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    const filterContacts = contacts
      .map(
        (c: InfoType) =>
          c.title.toLocaleLowerCase().includes(v.toLocaleLowerCase()) && c
      )
      .filter(Boolean);
    setFilteredContacts(filterContacts as InfoType[]);
  };
  return (
    <div ref={dropdownRef} className="w-full px-2 my-2 relative">
      <Input
        className=""
        placeholder=" Search Friends"
        onFocus={onFocus}
        onChange={onChange}
      />

      {open && (
        <div className="absolute top-full z-50 left-2 right-2 min-h-2 bg-background border border-border ">
          {contacts.length ? (
            filteredContacts.length ? (
              filteredContacts.map((c) => (
                <Button
                  onClick={() => onItemClick(c)}
                  className="w-full rounded-none justify-start"
                  variant="outline"
                >
                  {c.title}
                </Button>
              ))
            ) : (
              <Button
                className="w-full rounded-none justify-start"
                variant="outline"
              >
                User not found...
              </Button>
            )
          ) : (
            <div className="w-full flex items-center justify-center p-4">
              <Loader className="animate-spin" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatHistorySearch;
