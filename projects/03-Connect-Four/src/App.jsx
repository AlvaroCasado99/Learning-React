/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/**
 * El juego debe tener 6 filas y 7 columnas.
 * Gana: El que acumule 4 fichas seguidas.
 */

import { useState } from "react"
import confetti from 'canvas-confetti'

const TURNS = {
  R: '🔴',
  A: '⚪'
} 

const BOARD_DIMENSIONS = {
  X: 6,
  Y: 7
}

const WINNER_COMBO = 4;

const MAX_INDEX = BOARD_DIMENSIONS.X*BOARD_DIMENSIONS.Y-1

function Square ({children, index, updateBoard, isSelected}) {
  const handleClick = () => {
    updateBoard(index);
  }

  const className = `square ${(isSelected) ? 'is-selected' : ''}`

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

function WinnerModal({winner, restBoard}){
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

function TurnDisplay({turn}){
  return (
    <section className="turn">
        <Square isSelected={turn===TURNS.R}>{TURNS.R}</Square>
        <Square isSelected={turn===TURNS.A}>{TURNS.A}</Square>
    </section>
  )
}



function App() {
  const [board, setBoard] = useState(Array(42).fill(null))
  const [turn, setTurn] = useState(TURNS.R)
  const [winner, setWinner] = useState(null)  // false para el empate

  const isValidPosition = (index) => {
    if(board[index]!==null) return  // No se puede añadir si ya hay una ficha

    const positionBellow = index + 6;
    const isLastRow = index >= (BOARD_DIMENSIONS.X * (BOARD_DIMENSIONS.Y-1)+1)

    if(isLastRow) return true;  // Para evitar OutOfRange
    return board[positionBellow]!==null;  // El cuadrado de abajo esta libre
  }

  const checkWinner = (newBoard, index) => {
    const getRow = (index) => {
      const relativePos = index%BOARD_DIMENSIONS.X; // De 0 a 5 para el caso de 6 columnas
      const startIndex = index - relativePos;
      const endIndex = index + (BOARD_DIMENSIONS.X-1 - relativePos);
      return newBoard.slice(startIndex, endIndex+1);
    }

    const getColumn = (index) => {
      const relativePos = index%BOARD_DIMENSIONS.X; // De 0 a 5 para el caso de 6 columnas
      return newBoard.filter((_, position) => position%BOARD_DIMENSIONS.X === relativePos);
    }

    const getRightDiagon = (index) => {
      const growthFactor = (BOARD_DIMENSIONS.X+1);
      const nextIndex = (index) => index + growthFactor

      const xRelative = index%BOARD_DIMENSIONS.X;
      const yRelative = (index - xRelative)/BOARD_DIMENSIONS.X;

      // Caso en el que no hay elementos anteriores ni posteriores en la diagonal
      if(
          (xRelative===0 && yRelative===(BOARD_DIMENSIONS.Y-1)) ||
          (xRelative===(BOARD_DIMENSIONS.X-1) && yRelative===0)
        ) 
        return [newBoard[index]]
      
      // Casos con elementos anteriores y/o posteriores
      const [minStartRelative] = [xRelative, yRelative].sort()
      const startIndex = (xRelative!==0) 
        ? index - minStartRelative*growthFactor 
        : index;   // Si no tiene elementos anteriores
      
      const [minEndRelative] = [
        (BOARD_DIMENSIONS.X-1-xRelative), 
        (BOARD_DIMENSIONS.Y-1-yRelative)
      ].sort()
      const endIndex = (xRelative!==(BOARD_DIMENSIONS.X-1))
        ? index + minEndRelative*growthFactor
        : index;   // Si no tiene elementos posteriores

      // Extraer Lista
      let diagon = [];
      let currentIndex = startIndex;
      while(currentIndex <= endIndex){
        diagon.push(newBoard[currentIndex]);
        currentIndex = nextIndex(currentIndex);
      }

      return diagon;
    }

    const getLeftDiagon = (index) => {
      const growthFactor = (BOARD_DIMENSIONS.X-1)
      const nextIndex = (index) => index + growthFactor

      const xRelative = index%BOARD_DIMENSIONS.X;
      const yRelative = (index - xRelative)/BOARD_DIMENSIONS.X;

      // Caso en el que no hay elementos anteriores ni posteriores en la diagonal
      if(
        (xRelative===(BOARD_DIMENSIONS.X-1) && yRelative===(BOARD_DIMENSIONS.Y-1)) ||
        (xRelative===0 && yRelative===0)
      ) 
        return [newBoard[index]]

      const [minStartRelative] = [
        (BOARD_DIMENSIONS.X-1-xRelative), 
        yRelative
      ].sort()
      const startIndex = (xRelative!==(BOARD_DIMENSIONS.X-1))
        ? index - minStartRelative*growthFactor  
        : index;
      
      const [minEndRelative] = [xRelative, (BOARD_DIMENSIONS.Y-1-yRelative)].sort()
      const endIndex = (xRelative!==0)
        ? index + minEndRelative*growthFactor 
        : index;

      // Extraer Lista
      let diagon = [];
      let currentIndex = startIndex;
      while(currentIndex <= endIndex){
        diagon.push(newBoard[currentIndex]);
        currentIndex = nextIndex(currentIndex);
      }
  
        return diagon;
    }

    const isWinner = (line) => {
      let prev = null;
      let counter = 0;
      for (const elem of line){
        // Restart si elemnto es diferente al anterior o si es null
        (prev!==elem || elem===null) ? counter=0 : counter++;
        if(counter===(WINNER_COMBO-1)) return elem;
        prev=elem
      }

      return false;
    }
    
    
    const row = getRow(index);
    if(row.length>=WINNER_COMBO && isWinner(row)) return newBoard[index];

    const column = getColumn(index);
    if(column.length>=WINNER_COMBO && isWinner(column)) return newBoard[index];

    const rigthDiagon = getRightDiagon(index);
    if(rigthDiagon.length>=WINNER_COMBO && isWinner(rigthDiagon)) return newBoard[index];

    const leftDiagon = getLeftDiagon(index);
    if(leftDiagon.length>=WINNER_COMBO && isWinner(leftDiagon)) return newBoard[index];

    return false;
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every(square => square!==null)
  }

  const updateBoard = (index) => {
    if(!isValidPosition(index)) return null;

    // Setting new board
    const newBoard = board;
    newBoard[index] = turn;
    setBoard(newBoard)

    // Turn changes
    const newTurn = (turn===TURNS.R) ? TURNS.A : TURNS.R;
    setTurn(newTurn)

    // Check for winner
    const newWinner = checkWinner(newBoard, index);
    if (newWinner){
      setWinner(newWinner); // Caso de victoria
    }else if(checkEndGame(newBoard)){
      setWinner(false)  // Caso de empate
    }
  }

  const handleReset = () => {
    setBoard(Array(42).fill(null));
    setTurn(TURNS.R)
    setWinner(null);
  }

  return (
    <main className="board">
      <header>
        <h1>Conecta 4</h1>
        <button onClick={handleReset}>Reset</button>
      </header>

      <section className="game">
        {
          board.map((_, index)=>{
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <TurnDisplay turn={turn}/>

      <WinnerModal winner={winner} restBoard={handleReset}/>
    </main>
  )
}

export default App
