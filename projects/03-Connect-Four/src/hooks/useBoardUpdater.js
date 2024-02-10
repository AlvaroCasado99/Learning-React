import { useState } from "react"
import { checkEndGame, checkWinner, isValidPosition } from "../helpers/WinnerLogic"
import { TURNS } from "../constants/GameConstants"


export function useBoardUpdater(){
    const [board, setBoard] = useState(Array(42).fill(null))
    const [turn, setTurn] = useState(TURNS.R)
    const [winner, setWinner] = useState(null)  // false para el empate

    const updateBoard = (index) => {
        if(!isValidPosition(board, index)) return null;

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

    const resetBoard = () => {
        setBoard(Array(42).fill(null));
        setTurn(TURNS.R)
        setWinner(null);
    }

    return {board, turn, winner, updateBoard, resetBoard}
}