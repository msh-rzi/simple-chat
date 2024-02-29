import useCheckToken from "@/hooks/useCheckToken";

function MissingRoute() {
  useCheckToken();
  return null;
}

export { MissingRoute };
