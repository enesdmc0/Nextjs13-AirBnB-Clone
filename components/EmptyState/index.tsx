"use client"

import React from 'react';
import {useRouter} from "next/navigation";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title= "No exact matches",
    subtitle= "Try changing or removing some of your filters.",
    showReset
                                               }) => {
    const router = useRouter()
    return (
        <div className="h-[60vh] flex flex-col gap-2 items-center justify-center">
            <Heading title={title} subtitle={subtitle}/>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button outline label="Remove all filters" onClick={() => router.push("/")}/>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
