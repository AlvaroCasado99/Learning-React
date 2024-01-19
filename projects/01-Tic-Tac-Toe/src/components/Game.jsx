import { useReferee } from '../hooks/Referee'
import { Square } from '../components/Square'
import { WinnerModal } from './WinnerModal';
import { Board } from '../components/Board'
import { TURNS } from '../constants';

export function Game(){
    const {
        board, 
        turn, 
        winner, 
        updateBoard,
        handleReset
      } = useReferee();
    
      return (
        <main className='board'>
          <h1>Tic Tac Toe</h1>
          <Board board={board} updateBoard={updateBoard}/>

          <section className='turn'>
            <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
          </section>

          <WinnerModal winner={winner} resetBoard={handleReset}/>
        </main>
      )
}