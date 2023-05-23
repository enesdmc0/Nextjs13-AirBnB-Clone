"use client"
import React, {useCallback} from 'react';
import {CldUploadWidget} from "next-cloudinary";
import {TbPhotoPlus} from "react-icons/tb";
import Image from "next/image";

declare global {
    var cloudinary: any
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onChange, value}) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="wc4destr"
            options={{maxFiles: 1}}
        >
            {({open}) => {
                return (
                    <div onClick={() => open?.()} className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600">
                        <TbPhotoPlus size={50}/>
                        <div className="text-lg font-semibold">Click to upload</div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image src={value} alt="Upload" fill className="object-cover"/>
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;
