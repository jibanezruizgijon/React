import { useEffect, useState } from "react"
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import WinnerModal from "./components/WinnerModal";
import { checkWinner, checkEndGame } from "./logic/board";
import { saveGameToStorage, resetGameToStorage } from "./logic/storage";
function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  const [turno, setTurno] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    if (turnFromStorage) return JSON.parse(turnFromStorage);
    return TURNS.X;
  });
  // null es que no hay ganador, false es que hay un empate y true es que hay un ganador
  const [winner, setWinner] = useState(null)



  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurno(TURNS.X);
    setWinner(null);
    resetGameToStorage();
  }
  const updateBoard = (index) => {
    // No actualiza el tablero si ya hay algo
    if (board[index] || winner) return;
    const newBoard = [...board]
    newBoard[index] = turno
    setBoard(newBoard)

    // Cambia el turno
    const newTurn = turno == TURNS.X ? TURNS.O : TURNS.X;
    setTurno(newTurn);
    // guardar partida
    saveGameToStorage(newBoard, newTurn);


    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Empate
    }
  }

  useEffect(() => {
    // Como mínimo se ejecuta una vez al cargar el componente
    // y luego cada vez que cambia el estado del ganador
    console.log('useEffect');
    saveGameToStorage(board, turno);
  }, [turno, board])
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square idSelected={turno == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square idSelected={turno == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  )
}

export default App