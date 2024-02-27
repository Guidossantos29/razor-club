"use client"


import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import SideMenu from "./side-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";




const Header = () => {
   


    return (
        <>
            <Card>
                <CardContent className="p-5 justify-between items-center flex flex-row">
                    <Link href='/'>
                    <Image src='/razorLogo.png' alt='logo' height={18} width={120} />
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <MenuIcon size={16} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent className="p-0">
                            <SideMenu/>
                        

                          
                    </SheetContent>

                    </Sheet>

                   
                </CardContent>

            </Card>

        </>
    );
}

export default Header;
