import { useState } from 'react';
import { TURNS, WINNER_COMBOS } from '../constants';
import confetti from 'canvas-confetti'

export function useReferee (){
    const [board, setBoard] = useState(() =>{
        const  boardFromStorage = JSON.parse(window.localStorage.getItem('board'));
        if (boardFromStorage) return boardFromStorage
        return Array(9).fill(null)
    })
    const [turn, setTurn] = useState(() =>{
        const  turnFromStorage = window.localStorage.getItem('turn');
        return turnFromStorage ?? TURNS.X
    })
    const [winner, setWinner] = useState(null) // false=Draw 
  
    function checkWinner (boardToCheck) {
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
  
    function checkEndGame (newBoard) {
      return newBoard.every(square => square!==null)
    }
  
    function updateBoard (index) {
      if(board[index] || winner) return;
  
      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);

      const newTurn = (turn==TURNS.X) ? TURNS.O : TURNS.X
      setTurn(newTurn);

      // Guardar partida
      window.localStorage.setItem('board', JSON.stringify(newBoard))
      window.localStorage.setItem('turn', newTurn)
  
      // Winner checking
      const newWinner = checkWinner(newBoard);
      if(newWinner){
        setWinner(newWinner)
        confetti()
      }else if (checkEndGame(newBoard)){
        setWinner(false)
      }
    }
  
    function handleReset () {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setTurn(TURNS.X);
        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
    }
  
    return {board, turn, winner, updateBoard, handleReset}
  }