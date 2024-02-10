/* eslint-disable react/prop-types */
export function Square ({children, index, updateBoard, isSelected}) {
    const handleClick = () => {
      updateBoard(index);
    }
  
    const className = `square ${(isSelected) ? 'is-selected' : ''}`
  
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
}