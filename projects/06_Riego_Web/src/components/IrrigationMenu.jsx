/* eslint-disable react/prop-types */
import { useOpenClose } from "../hooks/useOpen";
import { useTotalTime } from "../hooks/useTotalTime";
import { useRestrictions } from "../hooks/useRestrictions";
import { DaySchedule } from "../components/DaySchedule"
import serialize from 'form-serialize'

import "./IrrigationMenu.css"


export function IrrigationMenu({field, week}){

    const {isOpen: isCampain, switchState} = useOpenClose(true);
    const {restrictions, setRestrictions} = useRestrictions({field, week});
    const {totalTime, error, updateTotalTime} = useTotalTime({max: restrictions.maxTime})

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const obj = serialize(form, {hash: true, empty: true})
        console.log(obj)
    }

    const handleChangeDays = (event) => {
        const newIrrigationDays = parseInt(event.target.value)
        if(!event.target.value) return;
        if(event.target.value>7) return;
        
        setRestrictions(prevState => ({
            prevState,
            irrigationDays: newIrrigationDays
        })) 
    }

    return (
            <article className="irrigation-editor">
                <legend>Nuevo Riego</legend>
                <form onSubmit={handleSubmit}>
                    <header>
                        <label htmlFor="irrigation-type">
                            En campaña
                            <input 
                                type="checkbox" 
                                id="irrigation-type" 
                                name="season" 
                                checked={isCampain} 
                                onChange={switchState}/>
                        </label>

                        <label htmlFor="irrigation-duration">
                            Días
                            <input 
                                type="number" 
                                id="irrigation-duration" 
                                name="days" 
                                min={1} 
                                max={7} 
                                value={restrictions.irrigationDays} 
                                onChange={handleChangeDays} 
                                readOnly={isCampain}/>
                        </label>

                        <label htmlFor="irrigation-maxTime">
                            Horas
                            <input 
                                type="number" 
                                id="irrigation-maxTime" 
                                className={error && "input-error"}
                                name="maxTime"
                                value={totalTime}
                                readOnly/>
                        </label>
                    </header>
                    <section>
                        <ul>
                            {
                                Array(restrictions.irrigationDays)
                                    .fill(1)
                                    .map((_, idx) => <DaySchedule 
                                        key={idx}
                                        day={idx}
                                        sectors={field.sectors}
                                        restrictions={restrictions}
                                        isCampain={isCampain}
                                        updateTotalTime={updateTotalTime}
                                        />)
                            }
                        </ul>
                    </section>
                    <p className="error" hidden={!error}>{error}</p>
                    <button disabled={error}>Guardar</button>
                </form>
            </article>
    )
}