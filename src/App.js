import { useState } from 'react'
import './App.css';

function App() {
  const [ p1PiecesLeft, setP1PiecesLeft ] = useState(21);
  const [ p2PiecesLeft, setP2PiecesLeft ] = useState(21);
  const [ currentPlayer, setPlayer ] = useState(1);
  const [ board, setBoard ]= useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ])

  const finishPlayersTurn = () => {
    if (currentPlayer == 1) {
      setP1PiecesLeft(p1PiecesLeft - 1)
      setPlayer(2)
    } else {
      setP2PiecesLeft(p2PiecesLeft - 1)
      setPlayer(1)
    }
  }

  const dropPeice = row => {
    for (let col = 5; col >= 0; col--) {
      let newBoard = [...board]
      if(newBoard[col][row] === 0) {
        newBoard[col][row] = currentPlayer
        setBoard(newBoard)
        finishPlayersTurn()
        return;
      }
    }
  }

  return (
    <div className='dropzone'>
      <header>Drop Zone</header>
      <button onClick={() => dropPeice(0)}>Zone 1</button>
      <button onClick={() => dropPeice(1)}>Zone 2</button>
      <button onClick={() => dropPeice(2)}>Zone 3</button>
      <button onClick={() => dropPeice(3)}>Zone 4</button>
      <button onClick={() => dropPeice(4)}>Zone 5</button>
      <button onClick={() => dropPeice(5)}>Zone 6</button>
      <button onClick={() => dropPeice(6)}>Zone 7</button>
    </div>
  );
}

export default App;
