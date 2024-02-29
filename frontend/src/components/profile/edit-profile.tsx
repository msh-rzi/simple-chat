import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserInfo } from "@/hooks/zustand/useUserInfo";
import { UserCardType } from "../user-card";
import { updateUser } from "@/lib/fetch";
import { cn } from "@/lib/utils";

const EditProfile = ({ children }: { children: ReactNode }) => {
  const { info: data, updateUserInfo: updateUserProfile } = useUserInfo();
  const [msg, setMsg] = useState({
    msg: "",
    status: 200,
  });
  const [values, setValues] = useState<UserCardType & { username: string }>({
    avatarImageSrc: data?.avatarImageSrc || "",
    description: data?.description || "",
    title: data?.title || "",
    username: data?.username || "",
  });
  const onClick = async () => {
    const res = await updateUser({ user: values });
    if (res.status === 200) {
      updateUserProfile({ ...data, ...values });
      setMsg({
        msg: res.msg,
        status: res.status,
      });
    } else
      setMsg({
        msg: "Error...",
        status: 400,
      });
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const name = event.target.name;
    setValues((prev) => ({ ...prev, [name]: val }));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              disabled
              id="username"
              defaultValue={`@${data?.username}`}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="title"
              defaultValue={data?.title}
              className="col-span-3"
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Bio" className="text-right">
              Bio
            </Label>
            <Input
              id="Bio"
              name="description"
              defaultValue={data?.description}
              className="col-span-3"
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">
              Avatar
            </Label>
            <Input
              id="avatar"
              name="avatarImageSrc"
              defaultValue={data?.avatarImageSrc}
              className="col-span-3"
              placeholder="Link"
              onChange={onChange}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col">
          <Button onClick={onClick} type="submit">
            Save changes
          </Button>
        </DialogFooter>
        {msg.msg && (
          <Label
            className={cn(
              msg.status === 200 ? "text-green-400" : "text-red-400",
              "text-right"
            )}
          >
            {msg.msg}
          </Label>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
