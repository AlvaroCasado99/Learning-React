/* eslint-disable react/prop-types */
import { useRef } from "react";
import "./SectorList.css"

function SectorItem ({ day, sectors, position, period, updateTotalTime, changePeriod, deletePeriod }){
  const sectorSelector = useRef();
  const timeInput = useRef();

  const handleDelete = (event) => {
    event.preventDefault();
    deletePeriod(period.id)
  }

  const handleSector = () => {
    changePeriod({
      ...period,
      sector: sectorSelector.current.value
    })
  }  

  const handleTime = () => {
    const newTime = (timeInput.current.value === "") ? 0 : parseInt(timeInput.current.value);
    const prevTime = (period.time === "") ? 0 : parseInt(period.time);
    const variation = newTime - prevTime;

    updateTotalTime(variation)

    changePeriod({
      ...period,
      time: isNaN(timeInput.current.value) ? "" : timeInput.current.value
    })
  }

  const baseName = `day[${day}][order][${position}]`;

  return (
    <li className="sector-item">
      <select 
        value={period.sector} 
        name={`${baseName}[sector]`} 
        ref={sectorSelector} 
        onChange={handleSector}>
        <option value={"none"} hidden>Elegir sector</option>
        {
          Array(sectors).fill(1)
            .map((_, idx) => (
              <option key={idx} value={idx}> {`Sector ${idx}`} </option>
            ))
        }
      </select>

      <label>
        Tiempo
        <input 
          type="number" 
          value={period.time}
          name={`${baseName}[time]`} 
          ref={timeInput} 
          onChange={handleTime}/>
      </label>

      <button onClick={handleDelete}>X</button>
    </li>
  )
}

export function SectorsList ({day, sectors, periods, updateTotalTime, changePeriod, deletePeriod}){
  return(
    <ul className="sector-list">
      {
        periods
          .map((period, idx) => <SectorItem
            key={idx} 
            day={day} 
            position={idx}
            sectors={sectors} 
            period={period}
            updateTotalTime={updateTotalTime}
            changePeriod={changePeriod}
            deletePeriod={deletePeriod}/>)
      }
    </ul>
  )
}