"use client"
import React from 'react';
import Image from "next/image"
import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";
import {format} from "date-fns"

import useCountries from "@/hooks/useCountries";
import {SafeListing, SafeReservation, SafeUser} from "@/types"
import HeartButton from "@/components/HeartButton";
import Button from "@/components/Button";


interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({data, actionId= "", onAction, actionLabel, reservation, disabled, currentUser, }) => {
    const router = useRouter();
    const {getByValue} = useCountries();
    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (disabled) {
            return
        }

        onAction?.(actionId)
    }, [disabled, onAction, actionId])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }
        return data.price
    }, [reservation, data.price])


    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)
        return `${format(start, "PP")} - ${format(end, "PP")}`
    }, [reservation])

    return (
        <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/listings/${data.id}`)}>
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image src={data.imageSrc} alt="Listing" fill className="object-cover h-full w-full transition group-hover:scale-110" />
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser}/>
                    </div>
                </div>
                <div className="font-semibold text-lg">{location?.region}, {location?.label}</div>
                <div className="font-light text-neutral-500">{reservationDate || data.category}</div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button label={actionLabel} onClick={handleCancel} small disabled={disabled}/>
                )}
            </div>
        </div>
    );
};

export default ListingCard;
