import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Service } from "@prisma/client";
import Image from "next/image";

interface ServiceItemProps {
    service: Service
}

const ServiceItem = ({ service }: ServiceItemProps) => {
    return (
        <Card>
            <CardContent className="p-3 w-full">
                <div className="flex gap-4 items-center w-full">
                    <div className="relative h-[110px] w-[110px] max-h-[110px] max-w-[110px]">
                        <Image
                            className="rounded-lg"
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            priority
                            style={{
                                objectFit: "contain"
                            }}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>
                        <p className="text-primary font-bold" >{Intl.NumberFormat("pt-br", {
                            style: "currency",
                            currency: "BRL"
                        }).format(Number(service.price))}</p>

                    </div>

                    <div className="flex items-center justify-between">
                       <Button variant="secondary">Agendar</Button>
                    </div>
                  

                </div>

            </CardContent>
        </Card>
    );
}

export default ServiceItem;