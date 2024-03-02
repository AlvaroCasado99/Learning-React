import { ALPHANUMERIC, MAX_ID_LENGTH } from "../assets/constants";

export function alphanumericID(length=MAX_ID_LENGTH){
    return Array(length)
        .fill(0)
        .map(() => ALPHANUMERIC[
            Math.floor(Math.random()*ALPHANUMERIC.length)
        ])
        .join('')
}