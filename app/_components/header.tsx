"use client"


import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Image from 'next/image'
import { CalendarIcon, HomeIcon, LogOut, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Avatar } from "../components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";




const Header = () => {
    const { data,status } = useSession()
    const handleLoginClick = async () => {
        await signIn('google')
    }

    const handleLogoutClick = async () => {
        
        await signOut()
    }


    return (
        <>
            <Card>
                <CardContent className="p-5 justify-between items-center flex flex-row">
                    <Image src='/razorLogo.png' alt='logo' height={18} width={120} />

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <MenuIcon size={16} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent className="p-0">
                        <SheetHeader className=" p-5 text-left border-b border-solid border-secundary">
                           <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>

                        {data?.user ? 'authenticated' && (
                            <div className="flex items-center gap-3 px-5 py-6">
                                <Avatar>
                                    <AvatarImage src={data.user?.image ?? ''}/>
                                </Avatar>

                                <h2 className="font-bold">{data.user.name}</h2>
                                <Button onClick={handleLogoutClick}>
                                <LogOutIcon />
                            </Button>
                            

                            
                            </div>
                            

                            
                            
                        ) : ( 
                        <div className="flex flex-col gap-2 px-5 py-6">
                            <div className="flex items-center gap-2">
                                <UserIcon size={32}/>
                                <h1 className="font-bold">Ola,faça seu Login!</h1>
                                


                            </div>
                            
                        </div>
                        )}
                        <div className="flex flex-col gap-3 px-5 ">
                            
                                <Button variant="outline" className="justify-start" asChild>
                                   <Link href="/">
                                    <HomeIcon size={18} className="mr-2"/>
                                    inicio
                                    </Link>
                                </Button>
                              
                                {data?.user && (
                        <div className="flex flex-col gap-3 ">
                                <Button variant="outline" className=" justify-start" asChild>
                                   <Link href="bookings">
                                    <CalendarIcon size={18} className="mr-2"/>
                                    Agendamentos
                                    </Link>
                                </Button>
                            </div>
                            )}
                            </div>

                          
                    </SheetContent>

                    </Sheet>

                   
                </CardContent>

            </Card>

        </>
    );
}

export default Header;
