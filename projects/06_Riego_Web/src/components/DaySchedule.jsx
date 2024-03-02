/* eslint-disable react/prop-types */
import { useId } from "react"
import { useOpenClose } from "../hooks/useOpen";
import { usePeriods } from "../hooks/usePeriods";
import { useStart } from "../hooks/useStart";
import { SectorsList } from "./SectorsList";
import "./DaySchedule.css"



export function DaySchedule({day, sectors, restrictions, isCampain, updateTotalTime}){
    const checkBoxId = useId();
    const { isOpen, switchState } = useOpenClose();
    const { start, changeStart } = useStart({day, isCampain, min: restrictions.minStart})
    const { periods, addPeriod, changePeriod, deletePeriod }= usePeriods();

    // VARIABLES
    const baseName = `day[${day}]`
    const defaultDate = (isCampain) ? restrictions.minDate : "";

    return(
        <li className="day-item">
            <header>
                <h5>Día {day+1} </h5>
                <input 
                    type="date" 
                    name={`${baseName}[startDate]`}
                    min={defaultDate}
                    />
                    
                <div>
                    <label htmlFor={checkBoxId}>
                        {isOpen ? "🔼" : "🔽"}
                    </label>
                    <input type="checkbox" onChange={switchState} id={checkBoxId} hidden/>
                </div>
            </header>
            <article hidden={!isOpen} className="day-config">
                <header>
                    <label>
                        Inicio
                        <input 
                            type="time"
                            name={`${baseName}[startHour]`}
                            value={start}
                            onChange={changeStart}/>
                            
                    </label>
                    <button onClick={addPeriod}>+</button>
                </header>
                <div>
                    <SectorsList 
                        day={day} 
                        sectors={sectors} 
                        periods={periods}
                        updateTotalTime={updateTotalTime}
                        changePeriod={changePeriod}
                        deletePeriod={deletePeriod}/>
                </div>
            </article>
        </li>
    )
}