import { useState } from "react"
import { getCurrentWeek } from "../utils/dateUtils";
import { DEFAULT_FIELD } from "../assets/constants";


export function useSearch(){
    const [search, setSearch] = useState({
        field: DEFAULT_FIELD,
        week: getCurrentWeek()
    });

    //TODO: Filtros

    const updateSearch = (newSearch) => {
        setSearch({
            field: newSearch.field,
            week: newSearch.week
        })
    }

    return {search, updateSearch}
}