import Link from "next/dist/client/link";
import { Button } from "../components/ui/button";
import { HomeIcon, CalendarIcon, LogOutIcon, UserIcon, LogInIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { SheetHeader, SheetTitle } from "../components/ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";

const SideMenu = () => {
    const { data, status } = useSession()
    const handleLoginClick = async () => {
        await signIn('google')
    }

    const handleLogoutClick = async () => {

        await signOut()
    }
    return (
        <>
            <SheetHeader className=" p-5 text-left border-b border-solid border-secundary">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? 'authenticated' && (
                <div className="flex items-center gap-3 px-5 py-6">
                    <Avatar>
                        <AvatarImage src={data.user?.image ?? ''} />
                    </Avatar>

                    <h2 className="font-bold">{data.user.name}</h2>
                    <Button onClick={handleLogoutClick}>
                        <LogOutIcon />
                    </Button>



                </div>




            ) : (
                <div className="flex flex-col gap-2 px-5 py-6">
                    <div className="flex items-center gap-2">
                        <UserIcon size={32} />
                        <h1 className="font-bold">Ola,faça seu Login!</h1>
                    </div>
                    <Button variant="secondary" className="w-full justify-start" onClick={handleLoginClick}>
                        <LogInIcon className="mr-2" size={18} />
                        Fazer Login
                    </Button>

                </div>
            )}
            <div className="flex flex-col gap-3 px-5 ">

                <Button variant="outline" className="justify-start" asChild>
                    <Link href="/">
                        <HomeIcon size={18} className="mr-2" />
                        inicio
                    </Link>
                </Button>

                {data?.user && (
                    <div className="flex flex-col gap-3 ">
                        <Button variant="outline" className=" justify-start" asChild>
                            <Link href="bookings">
                                <CalendarIcon size={18} className="mr-2" />
                                Agendamentos
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default SideMenu;