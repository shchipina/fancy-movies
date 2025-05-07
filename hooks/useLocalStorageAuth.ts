"use client"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useLocalStorageAuth = () => {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.uid) {
      localStorage.setItem("auth", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth");
    }
  }, [user]);
};