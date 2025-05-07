"use client"

import { useAppDispatch } from '@/hooks/reduxHook';
import { useAuth } from '@/hooks/useAuth'
import { removeUser } from '@/store/features/userSlice';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react'

function Profile() {
  const user = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = async () => {
    try {
      const isAuth = getAuth();
      await signOut(isAuth);
      dispatch(removeUser());
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container">
      <p>{user.email}</p>
      <button
        onClick={handleClick}
        className="bg-red-600 py-2 px-4 rounded-[2px] cursor-pointer"
      >
        Log out
      </button>
    </div>
  )
}

export default Profile;