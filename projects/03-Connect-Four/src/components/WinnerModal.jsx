/* eslint-disable react/prop-types */
import {Square} from './Square'

export function WinnerModal({winner, restBoard}){
    if (winner===null) return null;
    
    const winnerText = (winner) ? 'Ganador' : 'Empate!'
  
    return (
      <section className="winner">
        <div className="text">
          <h2>{winnerText}</h2>
          
          <header className="win">
            {winner && <Square>{winner}</Square>}
          </header>
  
          <footer>
            <button onClick={restBoard}>Volver a Jugar</button>
          </footer>
        </div>
      </section>
    )
  }