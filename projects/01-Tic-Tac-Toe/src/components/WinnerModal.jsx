import { Square } from "./Square";
import PropTypes from 'prop-types';

export function WinnerModal({winner, resetBoard}){
    if (winner===null) return null;

    const winnerText = winner ? `Ganó:` : 'Empate'

    return(
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>

                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                    <button onClick={resetBoard}>Reset</button>
                </footer>
            </div>
        </section>
    )
}

WinnerModal.propTypes = {
    winner: PropTypes.string,
    resetBoard: PropTypes.func.isRequired
}