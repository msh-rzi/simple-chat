import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserCardTitle from "./user-card-title";
import UserCardDescription from "./user-card-description";
import { cn } from "@/lib/utils";

export type UserCardType = {
  avatarImageSrc: string;
  title: string;
  description: string;
  avatarFallback?: string;
  hasBadge?: boolean;
  hideAvatar?: boolean;
  slot?: string;
  onClick?: (id: string) => void;
  pinned?: boolean;
  className?: string;
  isOnline?: boolean;
  hasUnreadMessage?: boolean;
};

const UserCard = ({
  avatarFallback = "CN",
  avatarImageSrc = "https://github.com/shadcn.png",
  description = "Deploy your new project in one-click.",
  title = "Title",
  hasBadge = false,
  hideAvatar = false,
  slot = undefined,
  onClick,
  pinned,
  className,
  isOnline = false,
  hasUnreadMessage = false,
}: UserCardType) => {
  const Component = (slot as any) ?? Button;

  return (
    <Component
      onClick={() =>
        typeof Component === typeof Button && onClick?.(avatarFallback)
      }
      variant="ghost"
      className={cn(
        typeof Component === typeof Button && "cursor-pointer ",
        pinned && "-order-1",
        "flex gap-2 bg-background items-center justify-start p-2 w-full truncate min-h-16 h-16 no-underline text-left rounded-none",
        className
      )}
    >
      {!hideAvatar && (
        <Avatar>
          <AvatarImage src={avatarImageSrc} alt={avatarFallback} />
          <AvatarFallback className="uppercase">
            {avatarFallback.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col w-[calc(100%_-50px)]">
        <UserCardTitle
          title={title}
          hideBadge={!hasBadge}
          isOnline={isOnline}
          pinned={pinned}
        />
        <UserCardDescription
          description={description}
          hasUnreadMessage={hasUnreadMessage}
          hideBadge={hasBadge}
        />
      </div>
    </Component>
  );
};

export default UserCard;
