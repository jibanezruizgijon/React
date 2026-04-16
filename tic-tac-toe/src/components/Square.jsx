export const Square = ({ children, idSelected, updateBoard, index }) => {
    const className = `square ${idSelected ? 'is-selected' : ''}`;
    const handleClick = () => {
        updateBoard(index);
    }
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}