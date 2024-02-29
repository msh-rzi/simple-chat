import Scrollbar from "@/components/scrollbar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Socket } from "socket.io-client";
import { InfoType } from "@/hooks/zustand/useUserInfo";
import { useSelectedChats } from "@/hooks/zustand/useSelectedChat";
import { getMessages } from "@/lib/fetch";

export type MessageListProps<T extends Socket = Socket> = {
  socket: T;
  userInfo: InfoType;
};
export interface MessageHistoryType {
  [roomId: string]: Message[];
}

export interface Message {
  id: Number;
  senderId: string;
  targetUserId: string;
  content: string;
  timestamp: string;
  targetProfile: InfoType;
  roomId: string;
}
const MessageList = ({ socket, userInfo }: MessageListProps) => {
  const [msgHistory, setMessageHistory] = useState<MessageHistoryType>({});
  const { user: target } = useSelectedChats();

  //
  if (!userInfo?.username) return null;

  // generate room name
  const sortedParams = [userInfo.username, target].sort();
  const roomName = `${sortedParams[0]}-${sortedParams[1]}`;

  const sortMessagesByTimestamp = (messages: Message[]): Message[] => {
    return messages.slice().sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);

      return dateA.getTime() - dateB.getTime();
    });
  };

  useEffect(() => {
    if (
      !msgHistory.hasOwnProperty(roomName) &&
      target &&
      !target.includes("Choose")
    ) {
      getMessages(roomName).then((msgs) => {
        console.log(msgs);
        console.log(sortMessagesByTimestamp(msgs));
        if (msgs.length) {
          const m = sortMessagesByTimestamp(msgs).map((l: any) => {
            l.senderId = l.senderUsername;
            l.targetId = l.targetUsername;
            return l;
          });
          setMessageHistory((prev) => ({
            ...prev,
            [roomName]: [...(prev[roomName] || []), ...m],
          }));
        } else {
          setMessageHistory((prev) => ({
            ...prev,
            [roomName]: [],
          }));
        }
      });
    }
  }, [roomName]);

  useEffect(() => {
    socket.on("user-room", (message) => {
      console.log("user-room", message);
    });

    socket.on(
      "private_message",
      ({ senderId, message, targetUserId, timestamp, id, user, roomId }) => {
        console.log("private message");
        setMessageHistory((p) => ({
          ...p,
          [roomId]: [
            ...(p[roomId] || []),
            {
              content: message,
              id,
              senderId,
              timestamp,
              targetUserId,
              targetProfile: user,
              roomId,
            },
          ],
        }));
      }
    );

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    return () => {
      console.log("Cleanup effect");
      socket.off("private_message");
      socket.off("user-room");
    };
  }, [socket]);

  const findThisRoomMessages =
    roomName in msgHistory ? msgHistory[roomName] : [];

  return (
    <div className="flex-auto w-full p-2 pt-0">
      <Scrollbar
        ref={(r: any) => r?.scrollToBottom()}
        className="flex flex-col gap-2 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div]:justify-end"
      >
        {findThisRoomMessages.map((m) => {
          const isMyMessages = m.senderId === userInfo.username;
          return (
            <p
              key={`${m.id}`}
              className={cn(
                isMyMessages
                  ? "self-end bg-green-200 rounded-xl rounded-br-none"
                  : "self-start bg-[#f6f6f6] rounded-xl rounded-bl-none",
                "max-w-[60%] p-2"
              )}
            >
              {m.content}
            </p>
          );
        })}
      </Scrollbar>
    </div>
  );
};

export default MessageList;
