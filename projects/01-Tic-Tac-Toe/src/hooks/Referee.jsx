/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { TURNS, WINNER_COMBOS } from '../constants';
import confetti from 'canvas-confetti'

export function useReferee (){
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
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
  
    function handleReset () {
      setBoard(Array(9).fill(null));
      setWinner(null);
      setTurn(TURNS.X);
    }
  
    return {board, turn, winner, updateBoard, handleReset}
  }