import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.png";
import React from "react";

const Header = () => {
  return (
    <div className="bg-indigo-600">
      <Head>
        <title>Ecommerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a className="flex flex-row cursor-pointer gap-2 items-center justify-center">
          <div>
            <span className=" font-bold text-1xl text-white">
              Demo E-commerce
            </span>
          </div>
          <div className="w-10 h-10 mb-2">
            <Image src={logo} alt="logo" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Header;
