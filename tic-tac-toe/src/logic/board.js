import { WINNER_COMBOS } from "../constants";
export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
            return boardToCheck[a]
        }
    }
    // Si no hay ganador
    return null;
}

export const checkEndGame = (boardToCheck) => {
    // Revisa si no hay espacios vacíos
    return boardToCheck.every(square => square !== null);
  }

