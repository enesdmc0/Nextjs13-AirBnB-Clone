"use client"

import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import SearchModal from "@/components/modals/SearchModal";
import RentModal from "@/components/modals/RentModal";

const ModalsProvider = () => {
    return (
        <>
            <LoginModal/>
            <RegisterModal/>
            <SearchModal/>
            <RentModal/>
        </>
    );
};

export default ModalsProvider;
