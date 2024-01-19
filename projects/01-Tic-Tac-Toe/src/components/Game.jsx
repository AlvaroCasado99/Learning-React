import { useReferee } from '../hooks/Referee'
import { Square } from '../components/Square'

const TURNS = {
    X: 'x',
    O: 'o'
  }

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