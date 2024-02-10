/* eslint-disable react/prop-types */
import { Square } from "./Square";

const TURNS = {
    R: '🔴',
    A: '⚪'
} 

export function TurnDisplay({turn}){
    return (
      <section className="turn">
          <Square isSelected={turn===TURNS.R}>{TURNS.R}</Square>
          <Square isSelected={turn===TURNS.A}>{TURNS.A}</Square>
      </section>
    )
  }