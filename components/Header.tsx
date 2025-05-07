"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Logo from "../public/logo.png";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Movies", path: "/movie" },
  { title: "TV Shows", path: "/tv-shows" },
  { title: "My List", path: "/favorites" },
]

const Header = () => {
  const pathname = usePathname();
  const user = useAuth();
  const userName = user.email?.slice(0, 2).toUpperCase();

  console.log(user)

  return (
    <>
      {user.isAuth && (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-[22px] px-[64px]">
          <div className="flex items-center">
            <Link href="/">
              <Image src={Logo} width={93} height={25} alt='Logo image' />
            </Link>

            <ul className="flex gap-5 ml-[45px]">
              {navLinks.map(link => (
                <li key={link.title}>
                  <Link href={link.path} className={pathname === link.path ? "border-b" : "text-gray-400"}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-600 w-10 h-10 rounded-[2px] flex items-center justify-center font-bold">
            <Link href="/profile">
              {userName}
            </Link>
          </div>
        </header>
      )}
    </>
  )
}

export default Header;
