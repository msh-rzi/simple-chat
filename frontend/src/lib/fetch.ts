import {
  AUTH_USER,
  CONTACTS,
  CREATE_USER,
  GET_ALL_CONTACTS,
  GET_MESSAGES,
  GET_ROOMS,
  UPDATE_USER,
} from "./constants";
import { getToken } from "./get-token";

export const createUser = async ({ user }: { user: any }) => {
  return gate({ url: CREATE_USER, method: "POST", body: user });
};
export const authUser = async ({ user }: { user: any }) => {
  return gate({ url: AUTH_USER, method: "POST", body: user });
};
export const getAllContacts = async () => {
  return gate({ url: CONTACTS + GET_ALL_CONTACTS, method: "GET" });
};
export const updateUser = async ({ user }: { user: any }) => {
  return gate({ url: UPDATE_USER, method: "PUT", body: user });
};
export const getRooms = async (user: any) => {
  return gate({ url: GET_ROOMS, method: "POST", body: user });
};
export const getMessages = async (roomId: string) => {
  return gate({ url: GET_MESSAGES + "/" + roomId, method: "GET" });
};

export const gate = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: "POST" | "GET" | "PUT";
  body?: any;
}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(getToken() && { token: getToken() }),
  };
  const req = await fetch(import.meta.env.BACKEND_URL + url, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });
  const res = await req.json();
  return res;
};
