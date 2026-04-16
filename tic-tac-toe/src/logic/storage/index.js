export const saveGameToStorage = (boardToSave, turnToSave) => {
    window.localStorage.setItem('board', JSON.stringify(boardToSave));
    window.localStorage.setItem('turn', JSON.stringify(turnToSave));
}

export const resetGameToStorage = () => {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
}