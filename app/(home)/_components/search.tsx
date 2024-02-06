"use client"

import { Button } from "@/app/components/ui/button";
import { Input } from "../../components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
    return ( 
        <div className="flex itens-center gap-2">
            <Input placeholder="Busco por uma barbearia..."></Input>
            <Button>
                <SearchIcon size={18} />
            </Button>


        </div>
     );
}
 
export default Search;
