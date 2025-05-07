"use client";

import AuthForm from "@/components/AuthForm";
import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { setUser } from "@/store/features/userSlice";
import { useLocalStorageAuth } from "@/hooks/useLocalStorageAuth";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/reduxHook";
import { useRouter } from "next/navigation";

const Login = () => {
  useLocalStorageAuth();
  const { isAuth, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading && isAuth) {
      router.push("/");
    }
  }, [isAuth, loading, router]);

  const handleSubmit = async (uemail: string, upassword: string) => {
    const auth = getAuth(app);

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, uemail, upassword);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, uemail, upassword);
      }

      dispatch(
        setUser({
          email: userCredential.user.email,
          token: userCredential.user.refreshToken,
          uid: userCredential.user.uid,
        })
      );
      router.push("/"); 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Authentication error:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    return null;
  }

  return (
    <div>
      {isLogin ? (
        <>
          <AuthForm onSubmit={handleSubmit} buttonLable="Sign in" />
          <p>
            Don’t have an account?{" "}
            <button onClick={() => setIsLogin(false)}>Register</button>
          </p>
        </>
      ) : (
        <>
          <AuthForm onSubmit={handleSubmit} buttonLable="Sign up" />
          <p>
            Already have an account?{" "}
            <button onClick={() => setIsLogin(true)}>Log in</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
