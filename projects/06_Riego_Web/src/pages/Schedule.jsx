/* eslint-disable react/prop-types */

import { useSearch } from "../hooks/useSearch";
import { useUser } from "../hooks/useUser";
import { useField } from "../hooks/useField";

import { IrrigationMenu } from "../components/IrrigationMenu";

import "./Schedule.css"

function Header ({ search, updateSearch, changeField, fields }){

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.target))
        
        updateSearch({
            field: form.field,
            week: form.week
        })
        
        changeField({search: form.field})
    }

    return(
        <header className="schedule-header">
            <h3>Programación del campo</h3>
            <div className="">
                <form id="schedule-form" defaultValue={search.field} onSubmit={handleSubmit}>
                    <div>
                        <select name="field">
                            <option value={"none"} hidden>Elegir campo</option>
                            {
                                fields.map(field => (
                                    <option 
                                        key={field} 
                                        value={field}>
                                            {field}
                                    </option>
                                ))
                            }
                        </select>
                        <input type="week" name="week" defaultValue={search.week}/>
                    </div>
                    <button>Buscar</button>
                </form>
                <div className="graph">
                    <p>Aquí va un gráfico</p>
                </div>
            </div>
        </header>
    )
}



export function Schedule(){
    const {user} = useUser();
    const {search, updateSearch} = useSearch(); // Controlar búsqueda y filtros
    const {field, changeField} = useField(search.field); // Obtención de datos del field

    return(
        <>
            <Header 
                search={search}
                updateSearch={updateSearch}
                changeField={changeField} 
                fields={user.fields}/>
            
            
            <section className="creation-menu">
                {
                    (Object.keys(field).length !== 0)
                        ? <IrrigationMenu field={field} week={search.week}/>
                        : <p>Debe elegir un campo</p>
                }
                </section>
            
            <section  className="future-schedule">
                <h4>Próximos Riegos</h4>
                <p>Aquí van todos los riegos planificados apartir de la semana actual <strong>(incluida)</strong>. Si los riegos ya terminaron entonces no se deben poder editar.</p>
            </section>
        </>
    )
}