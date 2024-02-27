import Image from "next/image";
import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import  Search  from "./_components/search"
import BookingItem from "../_components/booking-item";
import BarberShopItem from "./_components/barberShopItem";
import { db } from "../_lib/prisma";


export default async function Home() {

    const barbershops = await db.barbershop.findMany({})
  return (
  <div>
    <Header/>
    <div className="px-5 pt-5">
      <h2 className="text-xl font-bold">Seja bem Vindo</h2>
      <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
    </div> 

    <div className="px-5 mt-6">
    <Search/>
    </div>

    {/* <div className="px-5 mt-6">
      <h2 className="uppercase text-gray-400 font-bold mb-3 text-xs">Agendamentos</h2>
            <BookingItem booking={booking}/>

    </div> */}
    <div className="mt-6 mb-[4.5rem]"> 
        <h2 className="px-5 uppercase text-gray-400 font-bold mb-3 text-xs">Populares</h2>    

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
    </div>


    <div className="mt-6 mb-[4.5rem]"> 
        <h2 className="px-5 uppercase text-gray-400 font-bold mb-3 text-xs">Recomendados</h2>    

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
    </div>
    
    

            
    
       
  </div>
  );
}
