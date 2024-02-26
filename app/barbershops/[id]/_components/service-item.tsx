"use client"

import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { Calendar } from "@/app/components/ui/calendar";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { pt, ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from 'date-fns';
import { saveBooking } from "../_action/save-booking";
import { Loader2 } from "lucide-react";



interface ServiceItemProps {
    service: Service
    isAuthenticated: boolean;
    barbershop: Barbershop
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {
    const {data} = useSession()

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hour, setHour] = useState<string | undefined>();
    const [submitLoading,setSubmitLoanding] = useState(false)

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : []
    }, [date])

    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined);
    };

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn("google");
        }
    };
    const handleHourClick = (time: string) => {
        setHour(time)
    }
    const handleBookingSubmit = async () => {
        setSubmitLoanding(true)
        
        try{
            if(!hour || !date || !data?.user){
                return
            }
            const dateHour = Number(hour.split(':')[0])
            const dateMinute = Number(hour.split(':')[1])
            const newDate = setMinutes(setHours(date, dateHour), dateMinute);
            
            await saveBooking({
                serviceId: service.id,
                barbershopId: barbershop.id,
                date: newDate,
                userId: (data.user as any).id,
              });
        
    
        } catch(error) {
            console.log(error);
            
        } finally {
            setSubmitLoanding(false)
        }
       
    }
    

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


                    <Sheet>
                        <SheetTrigger asChild>
                            <div className="flex items-center justify-between">
                                <Button variant="secondary" onClick={handleBookingClick}>Reservar</Button>
                            </div>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secundary">
                                Faça sua reserva
                            </SheetHeader>
                            <div className="py-6">
                                <Calendar
                                    className="mt-6"
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateClick}
                                    locale={pt}
                                    fromDate={new Date()}
                                    styles={{
                                        head_cell: {
                                            width: "100%",
                                            textTransform: "capitalize",
                                        },
                                        cell: {
                                            width: "100%",
                                        },
                                        button: {
                                            width: "100%",
                                        },
                                        nav_button_previous: {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        nav_button_next: {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        caption: {
                                            textTransform: "capitalize",
                                        },
                                    }}
                                />
                            </div>


                            <div className="px-6 py-5 border-y border-solid border-secondary">
                                {date && (
                                    <div className="flex gap-3 overflow-x-auto py-6 px-5 border-y border-solid border-secundary">
                                        {timeList.map((time) => (
                                            <Button onClick={() => handleHourClick(time)} variant={hour === time ? "default" : "outline"} className="rounded-full" key={time}>{time}</Button>
                                        ))}
                                    </div>

                                )}
                            </div>

                            <div className="py-6 px-5 border-t border-solid border-secundary">
                                <Card>
                                    <CardContent className="p-3 flex flex-col gap-3">
                                        <div className="flex justify-between">
                                            <h2 className="font-bold">{service.name}</h2>
                                            <h3 className="font-bold text-sm">{Intl.NumberFormat("pt-br", {
                                                style: "currency",
                                                currency: "BRL"
                                            }).format(Number(service.price))}</h3>
                                        </div>

                                        {date && (
                                            <div className="flex justify-between">
                                                <h3 className="text-gray-400 text-sm">Data</h3>
                                                <h4 className="text-sm">{format(date, "dd 'de' MMMM", { locale: ptBR })}</h4>

                                            </div>
                                        )}

                                        {hour && (
                                            <div className="flex justify-between">
                                                <h3 className="text-gray-400 text-sm">Horario</h3>
                                                <h4 className="text-sm">{hour}</h4>

                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <h3 className="text-gray-400 text-sm">Barbearia</h3>
                                            <h4 className="text-sm">{barbershop.name}</h4>

                                        </div>

                                    </CardContent>
                                </Card>


                            </div>

                            <SheetFooter className="px-5">
                                <Button onClick={handleBookingSubmit} disabled={!hour || !date || submitLoading}>
                                    Confirmar Agendamento
                                    {submitLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}</Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>



                </div>

            </CardContent>
        </Card>
    );
}

export default ServiceItem;
