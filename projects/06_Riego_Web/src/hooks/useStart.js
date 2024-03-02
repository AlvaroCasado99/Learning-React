import { useState } from "react";

export function useStart ({day, isCampain, min}){
    const [ start, setStart ] = useState(
        (isCampain && (day===0)) ? min : ""
    )

    const changeStart = (event) => {
        const newStart = event.target.value;
        if(
            isCampain &&
            day===0 &&
            newStart<min
            ) return;

        setStart(newStart);
    }

    return {start, changeStart}
}