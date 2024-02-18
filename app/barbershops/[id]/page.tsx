import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "../[id]/_components/barbershopInfo"

interface BarberShopDetailsPageProps {
    params:{
        id?:string
    }
}



const BarberShopDetailsPage = async ({params}: BarberShopDetailsPageProps) => {
    if(!params.id){
        return null
    }


    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
    })


    if(!barbershop){
        return null
    }

    return (
        <BarbershopInfo barbershop={barbershop}/>
    )
}
 
export default BarberShopDetailsPage;