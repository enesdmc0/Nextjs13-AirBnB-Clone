import React from "react";

import { Nunito } from 'next/font/google'

import Navbar from "../components/navbar/Navbar";
import ClientOnly from "../components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";

import ToasterProvider from "@/providers/ToasterProvider";
import getCurrentUser from "@/actions/getCurrentUser";

import './globals.css'

const font = Nunito({subsets: ['latin']})

export const metadata = {
    title: 'AirBnB',
    description: 'AirBnB Clone',
}

export default async function RootLayout({children,}: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()
    return (
        <html lang="en">
        <body className={font.className}>
        <ClientOnly>
            <ToasterProvider/>
            <SearchModal/>
            <RentModal/>
            <LoginModal/>
            <RegisterModal/>
            <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pt-28 pb-20">
            {children}
        </div>
        </body>
        </html>
    )
}
