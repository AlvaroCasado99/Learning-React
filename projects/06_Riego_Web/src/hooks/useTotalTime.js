import { useState } from "react";

export function useTotalTime({max}){
    const [totalTime, setTotalTime ] = useState(0);
    const [error, setError ] = useState(null);

    const updateTotalTime = variation => (
        setTotalTime(prevState => {
            const newTime = prevState + variation
            if(newTime > max) setError('Se ha excecido el límite de tiempo para este campo.') 
            else setError(null)
            return newTime
        })
    )
  
    return {totalTime,  error, updateTotalTime}
}