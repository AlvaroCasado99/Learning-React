/* eslint-disable react/prop-types */
import { useId, useState } from "react"
import "./SectorSchedule.css"

function useOpenTab(){
    const [open, setOpen] = useState(false);
    const switchOpenState = () => {
        setOpen(!open);
    }

    return {open, switchOpenState}
}

export function SectorSchedule({sector}){
    const checkBoxId = useId();
    const { open, switchOpenState} = useOpenTab();

    return(
        <li className="sector-item">
            <header>
                <h5>Sector {sector} - </h5>
                <div>
                    <label htmlFor={checkBoxId}>
                        {open ? "🔼" : "🔽"}
                    </label>
                    <input type="checkbox" onChange={switchOpenState} id={checkBoxId} hidden/>
                </div>
            </header>

            <article hidden={!open}>
                <p>Aquí va la programación para este sector...</p>
                <table>
                    <thead>
                        <tr>
                            <th>L</th>
                            <th>M</th>
                            <th>X</th>
                            <th>J</th>
                            <th>V</th>
                            <th>S</th>
                            <th>D</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </article>
        </li>
    )
}