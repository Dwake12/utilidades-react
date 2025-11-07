import { useState, useEffect } from 'react'

// LOGIC OF THE GAME
import { TURNS } from './logic/Constants'
import { checkWinner } from './logic/CheckWinner'
import { chekEndGame } from './logic/CheckEndGame'

// COMPONETS
import { BoardTable } from './Components/BoarTable'
import { ChangeTurn } from './Components/ChangeTurn'
import { WinnerSection } from './Components/WinnerSection'

// STYLE & OTHER DEPENDENCIES
import './index.css'
import confetti from 'canvas-confetti'

function App() {
// STATES OF THE GAME
  const [board, setBoard] =  useState( () => {
    const boardForStorage = window.localStorage.getItem('board')
    return boardForStorage ? JSON.parse(boardForStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnForStorage = window.localStorage.getItem('turn')
    return turnForStorage ? JSON.parse(turnForStorage) : TURNS.X
  })

  const [winner, setWinner] = useState(null)

  // === FUNCION PRINCIPAL PARA ACTUALIZAR EL TABLERO ===
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

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  // El useffect es un hook que permite ejecutar codigo de manera arbitraria cada vez que las dependencias cambien
  useEffect (() => {
    // (Nota) si no le pasamos un segundo argumento (depedencias) el useffect se ejecutara lo que coloquemos dentro de el, cada vez que se rederice el componenete
    console.log('Cargando')
  },[winner])

  return(
    <main className='board'>
      <h1>Tres en raya</h1>

      {/* TABLERO DEL TRES EN RAYA */}
      <BoardTable
        board={board}
        updateBoard={updateBoard}
      >
      </BoardTable>

      {/* INDICADOR DE TURNO X U O */}
      <ChangeTurn
        stateTurn={turn}
        TURNS={TURNS}
      >
      </ChangeTurn> 

      {/* VENTANA MODAL DEL RESULTADO DEL JUEGO EL GANADOR O EMPATE */}
      <WinnerSection
        winner={winner} 
        resetGame={resetGame}
      >
      </WinnerSection>
    </main>
  )
}

export default App
