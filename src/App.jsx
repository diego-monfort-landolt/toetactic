import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}



const Square = ({children, isSelected, updateBoard, index})=> {
  const className=`square ${isSelected ? 'is-selected' :''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],[3, 4, 5],[6, 7, 8],
  [0, 3, 6],[1, 4, 7],[2, 5, 8],

  [0, 4, 8], [2, 4, 6]
]


function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  //null no hay ganador
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCeck) => {
    // revisamos todas las combos ganadoras x o o gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCeck[a] && 
        boardToCeck[a] === boardToCeck[b] &&
        boardToCeck[a] === boardToCeck[c] 
      ) {
        return boardToCeck[a]
      }
    }
    //si no hay ganadors
    return null 
    
  }
//btn refresh option
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    //no actualisamos esta posicion
    //si ya tiene algo
    if (board[index] || winner) return
    //actualisar el tablero
    const newBoard = [...board]

    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard) 
      if (newWinner) {
        
        setWinner(newWinner)
      } // check if game is over
    

  }

  return(
    <>
    <header className='header'>
      <h1>Tic Tac Toe</h1>
    </header>
    
    <main className='board'>
       


       <section className='game'>
         { 
         board.map((_, index) => {
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
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
       </section>
        
        {
          winner === null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner === false 
                    ? 'Empate' 
                    : 'The winner is: '
                  }
                </h2>
                
                <header className='win'>
                  {winner && <Square>{winner}</Square>} 
                 
                  </header>

              
                
                </div>

            </section>
          )
        }
       
    </main>
    
    </>
  )
}



export default App
