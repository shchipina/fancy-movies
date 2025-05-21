"use client"

import AuthForm from '@/components/AuthForm'
import { useAppDispatch } from '@/hooks/reduxHook'
import { setUser } from '@/store/features/userSlice';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import loginImage from "../../public/loginImage.png"

function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (uemail: string, upassword: string) => {
    const auth = getAuth()
    try {
      const credentialUser = await createUserWithEmailAndPassword(auth, uemail, upassword);

      dispatch(setUser({
        email: credentialUser.user.email,
        token: credentialUser.user.refreshToken,
        uid: credentialUser.user.uid
      }));

      router.push('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error.message);
    }
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
          title="Sign up"
          onSubmit={handleSubmit}
          buttonLable="Sign up"
        />
        <p className="font-medium text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="font-bold" >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register