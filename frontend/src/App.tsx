import { useLayoutEffect } from "react";
import "./App.css";
import { MissingRoute } from "./components/missing-route";
import AuthBox from "./layout/AuthBox";
import Main from "./layout/Main";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSocket } from "@/hooks/zustand/useSocket";

function App() {
  const { openConnection } = useSocket();
  const params = useLocation();
  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      const { pathname } = params;
      if (pathname === "/") {
        openConnection();
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [params]);
  return (
    <div className=" w-full h-full border border-border rounded-lg shadow-xl flex gap-1">
      <Routes>
        <Route path="/auth" Component={AuthBox} />
        <Route path="/" Component={Main} />
        <Route path="*" Component={MissingRoute} />
      </Routes>
    </div>
  );
}

export default App;
