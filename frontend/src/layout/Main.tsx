import { Separator } from "@radix-ui/react-separator";
import ChatMain from "./ChatMain";
import UsersPanel from "./UsersPanel";
import useCheckToken from "@/hooks/useCheckToken";

const Main = () => {
  useCheckToken();

  return (
    <div className="flex-1 h-full w-full flex bg-background ">
      <UsersPanel />
      <Separator
        className="min-w-[2px] bg-primary-foreground"
        orientation="vertical"
      />
      <ChatMain />
    </div>
  );
};

export default Main;
