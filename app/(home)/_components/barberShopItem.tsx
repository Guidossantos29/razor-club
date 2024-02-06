import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Barbershop } from "@prisma/client";
import { Badge, StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopItemProps {
    barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarbershopItemProps) => {
    return (
        <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
            <CardContent className="px-1 pb-0">

                <div className=" relative w-full h-[159px]">
                    <div className="absolute top-2 left-2 z-50">
                        <Badge className="opacity-90 flex gap-1 items-center top-3 left-3">
                            <StarIcon  size={12} className="fill-primary text-primary" />
                            <span className="text-xs">5,0</span>
                        </Badge>
                    </div>
                    <Image src={barbershop.imageUrl} alt={barbershop.imageUrl} className="h-[159px] rounded-2xl"
                        fill
                        style={{ objectFit: "cover", }}
                        sizes="100vw" />
                </div>

                <div className="px-2 pb-3">
                    <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                    <Button className="w-full" variant="secondary" mt-3>
                        Reservar
                    </Button>
                </div>

            </CardContent>
        </Card>


    );
}

export default BarberShopItem;
