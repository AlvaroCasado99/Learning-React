import { useState } from "react";

export function useOpenClose(defaultState=false){
    const [isOpen, setOpen] = useState(defaultState);
    const switchState = () => {
        setOpen(!isOpen);
    }


    return {isOpen, switchState}
}