import { useState, useEffect } from "react"
import { minToHours, getDateFromWeekAndDay, standardDateToHTMLDate } from "../utils/dateUtils";

export function useRestrictions({field, week}){
    const [restrictions, setRestrictions] = useState({
        irrigationDays: 0,
        minDate: "",
        minStart: "",
        maxTime: 0
    })

    useEffect(()=>{
        console.log("me cago en dios")
        setRestrictions({
            irrigationDays: field.period,
            minDate: standardDateToHTMLDate(getDateFromWeekAndDay(week, field.startDay)),
            minStart: field.startHour,
            maxTime: minToHours(field.maxTime)
        })

    }, [field, week])

    return {restrictions, setRestrictions}
}