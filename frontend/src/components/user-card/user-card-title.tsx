import { Badge } from "@/components/ui/badge";
import { Pin } from "@/svg/pin";

const UserCardTitle = ({
  title,
  hideBadge,
  isOnline = false,
  pinned,
}: {
  title: string;
  hideBadge?: boolean;
  isOnline?: boolean;
  pinned?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-2">
        <span className="text-base font-semibold">{title}</span>
        {isOnline && hideBadge && (
          <div className="h-1 w-1 bg-green-400 rounded-full shadow-[0px_0px_2px_1px_#48bb78,0px_0px_2px_0px_#9ae6b4] animate-pulse"></div>
        )}
        {pinned && <Pin width={15} height={15} />}
      </div>
      {/* TODO: set last message was sent */}
      {hideBadge && <Badge variant="ghost">10:10</Badge>}
    </div>
  );
};

export default UserCardTitle;
