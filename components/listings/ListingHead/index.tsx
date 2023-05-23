"use client"
import React from 'react';
import {SafeUser} from "@/types";
import useCountries from "@/hooks/useCountries";
import Heading from "@/components/Heading";
import Image from "next/image";
import HeartButton from "@/components/HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({title, imageSrc, locationValue, id, currentUser}) => {
    const { getByValue } = useCountries()
    const location = getByValue(locationValue)

    return (
        <>
            <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image src={imageSrc} alt="Image" fill className="w-full object-cover"/>
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser}/>
                </div>
            </div>
        </>
    );
};

export default ListingHead;
