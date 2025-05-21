"use client";

import AuthForm from "@/components/AuthForm";
import { useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { setUser } from "@/store/features/userSlice";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/reduxHook";
import { useRouter } from "next/navigation";

import loginImage from "../../public/loginImage.png"
import Loader from "@/components/Loader";
import Link from "next/link";

const Login = () => {
  const { isAuth, loading } = useAuth();
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
      const userCredential = await signInWithEmailAndPassword(auth, uemail, upassword);

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
        <AuthForm
          title="Sign in"
          onSubmit={handleSubmit}
          buttonLable="Sign in"
        />
        <p className="font-medium text-gray-300">
          Don’t have an account?{" "}
          <Link href="/register" className="font-bold" >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
