"use client"


import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { AvatarImage } from "../components/ui/avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import BarbershopMap from '../../public/barbershop-map.png'
import Image from "next/image";
import BookingInfo from "./booking-info";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { cancelBooking } from "../_actions/cancel-booking";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
      include: {
        service: true;
        barbershop: true;
      };
    }>;
  }

const BookingItem = ({booking}: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  
  const isBookingConfirmed = isFuture(booking.date);


  const handleCancelClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };


    
    return ( 
        <Sheet>
          <SheetTrigger asChild>
          <Card className="min-w-full">
            <CardContent className="py-5 px-0 flex ">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit">
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

                    <h2 className="font-bold" >{booking.service.name}</h2>


                    <div className=" flex  items-center gap-2">
                         <Avatar className="h-6 w-6">
                            <AvatarImage src={booking.barbershop.imageUrl} alt="avatarimg"/>
                            <AvatarFallback>A</AvatarFallback>
                         </Avatar>
                         <h3 className="text-sm">{booking.barbershop.name}</h3>
                    </div>

                    
                </div>



                <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary ">
                    <p className="text-sm capitalize">
                        {format(booking.date, "MMMM", {
                            locale: ptBR,
                        })}
                    </p>
                    <p className="text-2xl">{format(booking.date, "dd")}</p>
                    <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                </div>

                
                
            </CardContent>
        </Card>
          </SheetTrigger>

          <SheetContent>
          <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div >
          <div className="relative h-[180px] w-full mt-6">
            <Image src={BarbershopMap} fill alt={booking.barbershop.name} />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                  </div>
                </CardContent>
              </Card>
              
            </div>
          </div>

          <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit my-3">
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          
          <BookingInfo booking={booking}/>

          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>
            <Button   onClick={handleCancelClick} variant="destructive" disabled={!isBookingConfirmed || isDeleteLoading} className="w-full" >{isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Cancelar Reserva</Button>
            </SheetFooter>  
          </div>
          </SheetContent>
        </Sheet>


     );
}
 
export default BookingItem;
