import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCheckToken from "@/hooks/useCheckToken";

const AuthBox = () => {
  useCheckToken();

  return (
    <div className="flex-1 h-full w-full flex bg-background ">
      <div className="flex-1 flex items-center justify-center">
        <Tabs defaultValue="signin" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <SignUp />
          </TabsContent>
          <TabsContent value="signin">
            <SignIn />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthBox;
