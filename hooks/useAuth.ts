"use client"

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./reduxHook";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";
import { setUser, removeUser } from "@/store/features/userSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { email, token, uid } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            email: firebaseUser.email,
            token: firebaseUser.refreshToken,
            uid: firebaseUser.uid,
          })
        );
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return {
    isAuth: !!email,
    email,
    token,
    uid,
    loading,
  };
};