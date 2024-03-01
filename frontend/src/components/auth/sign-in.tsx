import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authUser } from "@/lib/fetch";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "@/hooks/zustand/useUserInfo";

const SignIn = () => {
  const { updateUserInfo } = useUserInfo();
  const navigate = useNavigate();
  const [msg, setMsg] = useState({
    status: 0,
    msg: "",
  });
  const formSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(2).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await authUser({ user: values });
    if (user.status === 200) {
      updateUserInfo(user.data);
      sessionStorage.setItem("token", user.token);
      // sessionStorage.setItem("info", JSON.stringify({ data: user.data }));
      setMsg({
        msg: user.msg,
        status: 200,
      });
      setTimeout(() => {
        navigate("/");
      }, 200);
    } else {
      setMsg({
        msg: user.msg,
        status: 0,
      });
    }
  }
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="VivintoUser1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Strong Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="my-4">
                Submit
              </Button>
            </form>
            {msg.msg && (
              <Label
                className={clsx(
                  msg.status === 200 ? "text-green-500" : "text-red-500"
                )}
              >
                {msg.msg}
              </Label>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;

export const Code = ({ children }: { children: ReactNode }) => (
  <code className="text-red-400">{children}</code>
);
