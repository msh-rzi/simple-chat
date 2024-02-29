import { Badge } from "@/components/ui/badge";
import UnreadMessagesCount from "./unread-messages-count";

const UserCardDescription = ({
  description,
  hasUnreadMessage,
  hideBadge = false,
}: {
  description: string;
  hideBadge?: boolean;
  hasUnreadMessage?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="truncate text-sm font-normal">{description}</span>
      {/* TODO: check is online */}
      <Badge variant="ghost">
        {!hideBadge ? !!hasUnreadMessage && <UnreadMessagesCount /> : null}
      </Badge>
    </div>
  );
};

export default UserCardDescription;
