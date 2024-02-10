import { useContext } from "react";
import { CartContext } from "../context/cart";

export function useCart(){
    const context = useContext(CartContext)
    
    // Es buena práctica comprobar si el contexto es undefined porque normalmente
    // es síntoma de se está intentando emplear el 'Custom hook' que controla el 
    // contexto en un área de la aplicación no cubierta por el 'Provider'
    if(context === undefined){
      throw new Error("useCart must be used within a CartProvider")
    }
    
    return context;
}