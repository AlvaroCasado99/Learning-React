/* eslint-disable react/prop-types */
export function Square ({children, updateBoard, index, isSelected}) {
    const handleClick = () => {
      updateBoard(index)
    }
    
    return (
      <div className={`square ${(isSelected) ? 'is-selected' : ''}`} onClick={handleClick}>
        {children}
      </div>
    )
  }