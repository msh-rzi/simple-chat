import { getToken } from "@/lib/get-token";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckToken = (path?: string) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (!token) navigate(path || "/auth");
    else navigate("/");
  }, []);
};

export default useCheckToken;
