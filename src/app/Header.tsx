import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <Link href="/" className="hover:underline flex items-center gap-1">
          <Image src="/logo.png" width="50" height="50" alt="Logo" />
          BidBuddy.com
        </Link>

        <div className="flex items-center gap-4">
          <div>{session ? <SignOut /> : <SignIn />}</div>
          <div>{session?.user?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
