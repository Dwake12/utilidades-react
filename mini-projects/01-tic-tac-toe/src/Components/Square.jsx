export const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handelClick = () => {
      updateBoard(index)
    }
    return(
      <div onClick={handelClick} className={className}>
        {children}
      </div>
    )
  }