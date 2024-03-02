import { useState } from "react"
import userInformationResuls from "../mocks/results_user_information.json"


/**
 * TODO: Elevar a contextro para que a lo largo de toda la página se pueda
 * acceder a la información básica del usuario sin tener que hacer peticiones.
 * @returns 
 */
export function useUser(){
    const [user, setUser] =  useState(userInformationResuls)

    return{ user }
}