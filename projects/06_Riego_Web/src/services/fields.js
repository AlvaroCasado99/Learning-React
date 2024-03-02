import userFieldsResults from "../mocks/results_user_fields.json"

export async function getFieldInformation({search}){
    //TODO: Peticion a API
    //TODO: setear keys para desacoplar de la logica de la BBDD
    return userFieldsResults.Results
        .find(field => field.fieldId.localeCompare(search)===0)
}