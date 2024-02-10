/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/**
 * El juego debe tener 6 filas y 7 columnas.
 * Gana: El que acumule 4 fichas seguidas.
 */

import { Square } from "./components/Square"
import { TurnDisplay } from "./components/TurnDisplay"
import { WinnerModal } from "./components/WinnerModal"
import confetti from 'canvas-confetti'
import { useBoardUpdater } from "./hooks/useBoardUpdater"
import { Game } from "./components/Game"


function App() {
  const {board, turn, winner, updateBoard, resetBoard} = useBoardUpdater()

  return (
    <main className="board">
      <header>
        <h1>Conecta 4</h1>
        <button onClick={resetBoard}>Reset</button>
      </header>

      <Game board={board} updateBoard={updateBoard}/>
      <TurnDisplay turn={turn}/>
      <WinnerModal winner={winner} restBoard={resetBoard}/>
    </main>
  )
}

export default App
