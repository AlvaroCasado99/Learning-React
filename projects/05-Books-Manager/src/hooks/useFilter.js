import { useState } from "react";

export function useFilter(){
  const [filter, setFilter] = useState(false);

  const changeFilter = () => {
    setFilter(!filter);
  }

  return{filter, changeFilter}
}