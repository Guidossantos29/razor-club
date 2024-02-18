"use client"

import { Button } from "@/app/components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image" 
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop
}


const BarbershopInfo = ({barbershop}: BarbershopInfoProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back()
      };
    
    return ( 
        <div>
            <div className="h-[250px] w-full relative">
                <Button size="icon" variant="outline" className="z-50 absolute top-4 left-4" >
                 <ChevronLeftIcon onClick={handleBackClick}/>
                </Button>

                <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4" >
                 <MenuIcon/>
                </Button>
                
                <Image className="opacity-75" src={barbershop.imageUrl} alt={barbershop.name} fill style={{
                    objectFit: "cover"
                }}/>
            </div>

            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold ">{barbershop.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <MapPinIcon size={18} className="text-primary"/>
                        <p className="text-sm">{barbershop.address}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                        <StarIcon size={18} className="text-primary"/>
                        <p className="text-sm">5,0 (899 avaliações)</p>
                    </div>
            </div>
           
            
        </div>
     );
}
 
export default BarbershopInfo;