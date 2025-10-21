import { useState } from 'react'
import './index.css'
import { use } from 'react'
import confetti from 'canvas-confetti'
const TURNS = {
  X: "x",
  O: "o"
}
const Square = ({children, isSelected, updateBoard, index}) => {
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

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadores para detectar si hay un ganador
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      } 
    }
  }

  const chekEndGame = (newBoard) => {
    // Revisar si hay empate, se le envia el newBoard para que verifique si en todas las posciones del array hay una X u O, en ese caso se considera que el juego es un empate ya que todas las posciones del array tienen un valor y no se detecto un combo ganador.
    return newBoard.every((Square) => Square !== null)
  }

  // === FUNCION PARA ACTUALIZAR EL TABLERO ===
  const updateBoard = (index) => {
    // Si ya hay un valor X u O o ya hay una ganador no dara como resultado un return donde no podremos hacer otro movimiento
    if (board[index] || winner) return

    // Si no hay ningun valor en esa posicion actualizamos con el valor X u O
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // ❌ ESTO ES UNA MALA PRACTICA NO PODEMOS ACTUALIZAR LOS ESTADOS DIRECTAMENTE ❌
    // board[index] = turn

    //Cambiamos el turno para que juegue el siguiente jugador
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newTurn)

    // Revisar si ya hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(chekEndGame(newBoard)){
      setWinner(false)
    }
  }

  //Funcion que reinicia todos los estados, reiniciando el juego nuevamente
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return(
    <main className='board'>
      <h1>Tres en raya</h1>
      <section className='game'>
        {
          // En este metodo .map el _ representa el valor o el contenido de ese array en este caso es (null) y el index representa la posicion del elemento en el array (0,1,2,3...)
          board.map((_,index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'Empate' : 'Gano: '
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Reiniciar</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
