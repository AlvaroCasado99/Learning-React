import { Square } from '../components/Square'
import PropTypes from 'prop-types';

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

Board.propTypes = {
  board: PropTypes.array.isRequired,
  updateBoard: PropTypes.func.isRequired
};
