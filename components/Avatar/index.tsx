"use client"
import React from 'react';
import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
    return  <Image width={30} height={30} className="rounded-full" src={src || "/assets/placeholder.jpg"} alt="Avatar"/>

};

export default Avatar;
