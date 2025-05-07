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

import loginImage from "../../public/loginImage.png"
import Loader from "@/components/Loader";

const Login = () => {
  useLocalStorageAuth();
  const { isAuth, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  console.log(loginImage)

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
    return <Loader />;
  }

  if (isAuth) {
    return null;
  }

  return (
    <div style={{
      backgroundImage: `url(${loginImage.src})`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    }}
      className="h-screen flex items-center justify-center"
    >
      <div className="bg-black/60 rounded-[4px] flex flex-col items-center pb-[48px]">
        {isLogin ? (
          <>
            <AuthForm
              title="Sign in"
              onSubmit={handleSubmit}
              buttonLable="Sign in"
            />
            <p className="font-medium text-gray-300">
              Don’t have an account?{" "}
              <button onClick={() => setIsLogin(false)} className="font-bold" >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <AuthForm
              title="Sign up"
              onSubmit={handleSubmit}
              buttonLable="Sign up"
            />
            <p className="font-medium text-gray-300">
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="font-bold" >
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
