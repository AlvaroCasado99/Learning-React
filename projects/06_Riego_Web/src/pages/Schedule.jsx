/* eslint-disable react/prop-types */
import { useState } from "react"
import { DEFAULT_FIELD, DEFAULT_WEEK } from "../assets/constants"
import { SectorSchedule } from "../components/SectorSchedule"

import "./Schedule.css"

function Header ({ search, updateSearch }){
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.target))
        updateSearch({
            field: form.field,
            week: form.week
        })
    }

    return(
        <header>
            <h3>Programación del campo</h3>
            <form id="schedule-form" defaultValue={search.field} onSubmit={handleSubmit}>
                <select name="field">
                    <option value={"none"} hidden>Elegir campo</option>
                    <option value={1}>Campo 1</option>
                    <option value={2}>Campo 2</option>
                    <option value={3}>Campo 3</option>
                </select>
                <input type="week" name="week" defaultValue={search.week}/>
                <button>Buscar</button>
            </form>
        </header>
    )
}



export function Schedule(){
    const [search, setSearch] = useState({
        field: DEFAULT_FIELD,
        week: DEFAULT_WEEK
    });

    

    return(
        <>
            <Header search={search} updateSearch={setSearch}/>
            <section>
                <h4>Planificación para la semana {search.week} del campo {search.field}</h4>
                <ul>
                    {
                        [1,2,3,4,5,6].map(sector => <SectorSchedule key={sector} sector={sector}/>)
                    }
                </ul>
            </section>
        </>
    )
}