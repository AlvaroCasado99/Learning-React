import { useCallback, useRef, useState } from "react";
import { getFieldInformation } from "../services/fields"

export function useField({search}){
    const [field, setField] = useState({});
    const [error, setError] = useState("")
    const prevField = useRef(search);

    const changeField = useCallback(
        async ({search}) => {
            if(prevField.current === search) return;
    
            try{
                prevField.current = search;
                const newField = await getFieldInformation({search})
                setField(newField);
            }catch(err){
                setError(err.message)
            }
            
        }
        ,[]
    ) 

    return {field, error, changeField}
}