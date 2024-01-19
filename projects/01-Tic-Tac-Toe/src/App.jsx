/* eslint-disable react/prop-types */
import confetti from 'canvas-confetti'
import { useState } from 'react';
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/// Hooks


// Componentes
function Square ({children, updateBoard, index, isSelected}) {
  const handleClick = () => {
    updateBoard(index)
  }
  
  return (
    <div className={`square ${(isSelected) ? 'is-selected' : ''}`} onClick={handleClick}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // false=Draw 

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const[ a, b, c ] = combo;

      if(
          boardToCheck[a] &&
          boardToCheck[a] == boardToCheck[b] &&
          boardToCheck[a] == boardToCheck[c]
        ){
        return boardToCheck[a]
      }
    }

    return null;
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every(square => square!==null)
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    setBoard(newBoard);
    setTurn(turn==TURNS.X ? TURNS.O : TURNS.X);

    // Winner checking
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      setWinner(newWinner)
      confetti()
    }else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurn(TURNS.X);
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((_, index)=>{
            return (
              <Square key={index} updateBoard={updateBoard} index={index}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner!==null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner 
                    ?  `Ganó:`
                    :  'Empate'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={handleReset}>Reset</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
