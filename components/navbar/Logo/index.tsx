"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import Image from "next/image"
const Logo = () => {
    const router = useRouter();
    return <Image onClick={() => router.push("/")} src="/assets/airbnb.png" className="hidden md:block cursor-pointer" height={100} width={100} alt="Logo"/>
};

export default Logo;
