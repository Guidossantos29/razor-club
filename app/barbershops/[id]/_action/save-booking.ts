"use server"

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBookingParams {
    barbershopId:string;
    serviceId:string;
    userId:string;
    date:Date;
}

export const saveBooking = async (params:SaveBookingParams) => {
    await db.booking.create({
        data: {
            barbershopId:params.barbershopId,
            userId: params.userId,
            serviceId: params.serviceId,
            date: params.date
        }
    })
    revalidatePath("/")
    revalidatePath("/bookings")
}
