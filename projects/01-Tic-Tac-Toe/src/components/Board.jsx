/* eslint-disable react/prop-types */
import { Square } from '../components/Square'

export function Board({board, updateBoard}){
    return(
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
    )
}