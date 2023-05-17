import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from "../components/navbar/Navbar";
import React from "react";
import ClientOnly from "../components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";

const nunito = Nunito({subsets: ['latin']})

export const metadata = {
    title: 'AirBnB',
    description: 'AirBnB Clone',
}

export default async function RootLayout({children,}: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()
    return (
        <html lang="en">
        <body className={nunito.className}>
        <ClientOnly>
            <ToasterProvider/>
            <RentModal/>
            <LoginModal/>
            <RegisterModal/>
            <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
        </body>
        </html>
    )
}
