import UserCard from "../user-card";
import { useUserInfo } from "@/hooks/zustand/useUserInfo";
import EditProfile from "./edit-profile";
import { Setting } from "@/svg/setting";
import IconButton from "../icon-button";

const Profile = () => {
  const { info: userData } = useUserInfo();
  return (
    <div className="w-full flex items-center justify-center pr-1">
      <UserCard slot="div" {...(userData as any)} hasBadge={true} />
      <EditProfile>
        <IconButton>
          <Setting />
        </IconButton>
      </EditProfile>
    </div>
  );
};

export default Profile;
