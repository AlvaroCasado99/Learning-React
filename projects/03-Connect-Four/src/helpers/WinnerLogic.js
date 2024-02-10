import { BOARD_DIMENSIONS, WINNER_COMBO } from "../constants/GameConstants";

export function isValidPosition (board, index) {
    if(board[index]!==null) return  // No se puede añadir si ya hay una ficha
    const positionBellow = index + 6;
    const isLastRow = index >= (BOARD_DIMENSIONS.X * (BOARD_DIMENSIONS.Y-1)+1)

    if(isLastRow) return true;  // Para evitar OutOfRange
    return board[positionBellow]!==null;  // El cuadrado de abajo esta libre
}

function getRow(board, index) {
    const relativePos = index%BOARD_DIMENSIONS.X; // De 0 a 5 para el caso de 6 columnas
    const startIndex = index - relativePos;
    const endIndex = index + (BOARD_DIMENSIONS.X-1 - relativePos);
    return board.slice(startIndex, endIndex+1);
}

function getColumn(board, index) {
    const relativePos = index%BOARD_DIMENSIONS.X; // De 0 a 5 para el caso de 6 columnas
    return board.filter((_, position) => position%BOARD_DIMENSIONS.X === relativePos);
}

function getRightDiagon(board, index) {
    const growthFactor = (BOARD_DIMENSIONS.X+1);
    const nextIndex = (index) => index + growthFactor

    const xRelative = index%BOARD_DIMENSIONS.X;
    const yRelative = (index - xRelative)/BOARD_DIMENSIONS.X;

    // Caso en el que no hay elementos anteriores ni posteriores en la diagonal
    if(
        (xRelative===0 && yRelative===(BOARD_DIMENSIONS.Y-1)) ||
        (xRelative===(BOARD_DIMENSIONS.X-1) && yRelative===0)
      ) 
      return [board[index]]
    
    // Casos con elementos anteriores y/o posteriores
    const [minStartRelative] = [xRelative, yRelative].sort()
    const startIndex = (xRelative!==0) 
      ? index - minStartRelative*growthFactor 
      : index;   // Si no tiene elementos anteriores
    
    const [minEndRelative] = [
      (BOARD_DIMENSIONS.X-1-xRelative), 
      (BOARD_DIMENSIONS.Y-1-yRelative)
    ].sort()
    const endIndex = (xRelative!==(BOARD_DIMENSIONS.X-1))
      ? index + minEndRelative*growthFactor
      : index;   // Si no tiene elementos posteriores

    // Extraer Lista
    let diagon = [];
    let currentIndex = startIndex;
    while(currentIndex <= endIndex){
      diagon.push(board[currentIndex]);
      currentIndex = nextIndex(currentIndex);
    }

    return diagon;
}

function getLeftDiagon(board, index) {
    const growthFactor = (BOARD_DIMENSIONS.X-1)
    const nextIndex = (index) => index + growthFactor

    const xRelative = index%BOARD_DIMENSIONS.X;
    const yRelative = (index - xRelative)/BOARD_DIMENSIONS.X;

    // Caso en el que no hay elementos anteriores ni posteriores en la diagonal
    if(
      (xRelative===(BOARD_DIMENSIONS.X-1) && yRelative===(BOARD_DIMENSIONS.Y-1)) ||
      (xRelative===0 && yRelative===0)
    ) 
      return [board[index]]

    const [minStartRelative] = [
      (BOARD_DIMENSIONS.X-1-xRelative), 
      yRelative
    ].sort()
    const startIndex = (xRelative!==(BOARD_DIMENSIONS.X-1))
      ? index - minStartRelative*growthFactor  
      : index;
    
    const [minEndRelative] = [xRelative, (BOARD_DIMENSIONS.Y-1-yRelative)].sort()
    const endIndex = (xRelative!==0)
      ? index + minEndRelative*growthFactor 
      : index;

    // Extraer Lista
    let diagon = [];
    let currentIndex = startIndex;
    while(currentIndex <= endIndex){
      diagon.push(board[currentIndex]);
      currentIndex = nextIndex(currentIndex);
    }

      return diagon;
}

const isWinner = (line) => {
    let prev = null;
    let counter = 0;
    for (const elem of line){
      // Restart si elemnto es diferente al anterior o si es null
      (prev!==elem || elem===null) ? counter=0 : counter++;
      if(counter===(WINNER_COMBO-1)) return elem;
      prev=elem
    }

    return false;
}

export function checkWinner (board, index) {
    const row = getRow(board, index);
    if(row.length>=WINNER_COMBO && isWinner(row)) return board[index];

    const column = getColumn(board, index);
    if(column.length>=WINNER_COMBO && isWinner(column)) return board[index];

    const rigthDiagon = getRightDiagon(board, index);
    if(rigthDiagon.length>=WINNER_COMBO && isWinner(rigthDiagon)) return board[index];

    const leftDiagon = getLeftDiagon(board, index);
    if(leftDiagon.length>=WINNER_COMBO && isWinner(leftDiagon)) return board[index];

    return false;
  }

export function checkEndGame (board) {
    return board.every(square => square!==null)
  }