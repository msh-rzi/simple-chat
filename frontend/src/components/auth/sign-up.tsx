import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/lib/fetch";
import { useState } from "react";
import { Label } from "../ui/label";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "@/hooks/zustand/useUserInfo";

const SignUp = () => {
  const { updateUserInfo } = useUserInfo();
  const navigate = useNavigate();
  const [msg, setMsg] = useState({
    status: 0,
    msg: "",
  });
  const formSchema = z.object({
    username: z.string(),
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
    const res = await createUser({ user: values });
    setMsg(res);
    if (res?.token) {
      sessionStorage.setItem("token", res.token);
      updateUserInfo(res.data);
      // sessionStorage.setItem("info", JSON.stringify({ data: res.data }));
      setTimeout(() => {
        navigate("/");
      }, 200);
    }
  }
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
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

export default SignUp;
