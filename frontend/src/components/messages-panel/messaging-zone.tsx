import IconButton from "../icon-button";
import { Send } from "@/svg/send";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import EmojiPanel, {
  emojiPanel,
} from "@/components/messages-panel/emoji-panel";

type messagesZoneProps = {
  getMessage: (msg: string) => void;
};

const MessagingZone = ({ getMessage }: messagesZoneProps) => {
  const [message, setMessage] = useState("");
  const onSendClick = () => {
    // TODO: send message to backend and clear input
    getMessage(message);
    setMessage("");
  };
  return (
    <div className="w-full h-12 bg-background flex items-center px-2 gap-1">
      <Input
        placeholder="Write Messages..."
        className="transition-transform"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <ZoneIcons
        onEmojiClick={(emoji) => setMessage((prev) => `${prev}${emoji.emoji}`)}
        onSendClick={onSendClick}
      />
    </div>
  );
};

export default MessagingZone;

export const variants = {
  hide: { opacity: 0, rotate: 180 },
  show: { opacity: 1, rotate: 0 },
};

export const ZoneIcons = ({
  onEmojiClick,
  onSendClick,
}: { onSendClick: () => void } & emojiPanel) => {
  return (
    <div className="flex items-center justify-center h-full">
      <EmojiPanel onEmojiClick={onEmojiClick} />

      <IconButton onClick={onSendClick}>
        <Send width={25} height={25} />
      </IconButton>
    </div>
  );
};
