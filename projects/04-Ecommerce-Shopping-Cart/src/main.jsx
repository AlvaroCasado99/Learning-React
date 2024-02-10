import ReactDOM from 'react-dom/client'
import { FiltersProvider } from './context/filters.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * Envolvemos toda la aplicación para dar contexto a todos los componentes sobre los filtros,
   * puesto que cada uno de ellos necesita un aspecto relacionado con los filtros:
   * <App> -> filterProducts
   * <Footer> -> filters
   * <Filters> -> setFilters
   * 
   * EL resto de componentes que no los necesitan tienen la opción de no usarlos. No es posible
   * excluirlos del contexto actual por colgar todos de <App>
   */

  <FiltersProvider>
    <App />
  </FiltersProvider>,
)
