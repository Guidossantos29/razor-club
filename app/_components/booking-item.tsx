import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { AvatarImage } from "../components/ui/avatar";



const BookingItem = () => {
    return ( 
        <Card>
            <CardContent className="p-5 py-0 flex justify-between ">
                <div className="flex flex-col gap-2 py-5 ">
                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
                    <h2 className="font-bold" >Corte de cabelo</h2>


                    <div className=" flex  items-center gap-2">
                         <Avatar className="h-6 w-6">
                            <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" alt="avatarimg"/>
                            <AvatarFallback>A</AvatarFallback>
                         </Avatar>
                         <h3 className="text-sm">Barber Vintage</h3>
                    </div>

                    
                </div>


                



                <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-3">
                    <p className="text-sm">fevereiro</p>
                    <p className="text2xl">06</p>
                    <p className="text-sm">09:45</p>

                </div>
                
                
            </CardContent>
        </Card>


     );
}
 
export default BookingItem;
