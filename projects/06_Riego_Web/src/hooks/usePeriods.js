import { useState } from "react";
import { alphanumericID } from "../utils/ddbbUtils";

export function usePeriods(){
    const [periods, setPeriods] = useState([]);

    const addPeriod = (event) => {
        event.preventDefault();
        setPeriods(prevState => ([
            ...prevState,
            {
                id: alphanumericID(),
                sector: "none",
                time: 0
            }
        ]))
    }

    const changePeriod = (period) => {
        const index = periods.indexOf(
            periods.find(item => item.id === period.id)
        )

        const newPeriods = [
            ...periods.slice(0, index),
            period,
            ...periods.slice((index+1)),
        ]
        setPeriods(newPeriods)
    }

    const deletePeriod = (id) => {
        const newPeriods = periods.filter(period => period.id!==id)
        setPeriods(newPeriods)
    }

    return {
        periods,
        addPeriod,
        changePeriod,
        deletePeriod
    }
}