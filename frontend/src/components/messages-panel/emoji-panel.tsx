import { Emoji } from "@/svg/emoji";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export type emojiPanel = {
  onEmojiClick: (emoji: EmojiClickData) => void;
};

const EmojiPanel = ({ onEmojiClick }: emojiPanel) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 p-2">
          <Emoji width={25} height={25} />
        </div>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-min p-0">
        <EmojiPicker onEmojiClick={(em) => onEmojiClick(em)} />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPanel;
