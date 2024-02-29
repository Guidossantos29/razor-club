import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "../[id]/_components/barbershopInfo"
import ServiceItem from "./_components/service-item"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"

interface BarberShopDetailsPageProps {
    params: {
        id?: string
        
    }
}



const BarberShopDetailsPage = async ({ params }: BarberShopDetailsPageProps) => {
    const session = await getServerSession(authOptions)
    if (!params.id) {
        return null
    }


    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true
        },
    })


    if (!barbershop) {
        return null
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />
            
            <div className="px-5 flex flex-col gap-4 py-6">
            {barbershop.services.map(service => (
                <ServiceItem key={service.id} service={service} barbershop={barbershop} isAuthenticated={!!session?.user} />
            ))}
            </div>
         

           

        </div>

    )
}

export default BarberShopDetailsPage;
