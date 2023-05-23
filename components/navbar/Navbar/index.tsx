import React from 'react';
import Container from "@/components/Container";
import Logo from "@/components/navbar/Logo";
import Search from "@/components/navbar/Search";
import UserMenu from "@/components/navbar/UserMenu";
import {SafeUser} from "@/types";
import Categories from "@/components/navbar/Categories";

interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
    console.log(currentUser, "navbar")
    return (
        <div className="fixed w-full bg-white shadow-sm z-10">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Logo/>
                        <Search/>
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
    );
};

export default Navbar;
