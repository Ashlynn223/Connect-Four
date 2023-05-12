import { useState } from 'react'
import './App.css';

const PLAYER_ONE_COLOR = '#d19d5a'
const PLAYER_TWO_COLOR = '#b5b0a7'
const EMPTY_BOARD = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]

const Cell = ({ index, board }) => {

  const cellColor = () => {
    const row = Math.floor(index / 7)
    const col = index % 7
    if(board[row][col] === 1) return PLAYER_ONE_COLOR 
    if(board[row][col] === 2) return PLAYER_TWO_COLOR
  }

  return(
    <div className="cell">
      <div style={{ borderRadius: '75px', backgroundColor: cellColor(), width: '75px', height: '75px' }}></div>
    </div>
  )
}

const Grid = ({ board }) => {
  const cells = [...Array(42)].map((_, index) => {
    return (
      <Cell
        key={index}
        index={index}
        board={board}
      />
    )
  })

  return <div className="grid">{cells}</div>
}

function App() {
  const [ p1PiecesLeft, setP1PiecesLeft ] = useState(21);
  const [ p2PiecesLeft, setP2PiecesLeft ] = useState(21);
  const [ currentPlayer, setPlayer ] = useState(1);
  const [ gameOver, setGameOver ] = useState(false);
  const [ board, setBoard ]= useState(EMPTY_BOARD)


  const switchPlayers = () => {
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
        if(checkForHorizontalWin(currentPlayer) || checkForVerticalWin(currentPlayer) || checkForDiagonalWin(currentPlayer)) {
          setGameOver(true)
        } else { switchPlayers() }
        return;
      }
    }
  }

  const checkForHorizontalWin = (player) => {
    const ROWS = board.length
    const COLS = board[0].length

    for(let row = 0; row < ROWS; row++) {
      for(let col = 0; col < COLS - 3; col++) {
        if(board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player) {
            return true
          }
      }
    }
    return false
  }

  const checkForVerticalWin = (player) => {
    const ROW = board.length;
    const COL = board[0].length;

    for(let col = 0; col < COL; col++) {
      for(let row = 0; row < ROW - 3; row++) {
        if (
          board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player
          ) {
            return true
          }
      }
    }
    return false
  }

  const checkForDiagonalWin = (player) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] !== 0 &&
            board[row][col] === board[row + 1][col + 1] &&
            board[row][col] === board[row + 2][col + 2] &&
            board[row][col] === board[row + 3][col + 3]) {
          return true;
        }
      }
    }
    for (let row = 0; row < 3; row++) {
      for (let col = 6; col > 2; col--) {
        if (board[row][col] !== 0 &&
            board[row][col] === board[row + 1][col - 1] &&
            board[row][col] === board[row + 2][col - 2] &&
            board[row][col] === board[row + 3][col - 3]) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <div className="main-container">
      {
        gameOver ? (
          <div className="gameOverContainer">
            <div className="gameOverContent">
              <header className="gameOverText">
                Player {currentPlayer} Wins!
              </header>
              <button
                className="playAgainButton"
                onClick={() => {
                  setGameOver(false)
                  setBoard(EMPTY_BOARD)
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        ) : null
      }
      <div className="gameBoard">
          <div id="custom-cursor" />
          <div className='banner'>
            Player {currentPlayer}'s Turn
          </div>
          <div className="dropZone">
            <button className="dropZoneButton" onClick={() => dropPeice(0)} />
            <button className="dropZoneButton" onClick={() => dropPeice(1)} />
            <button className="dropZoneButton" onClick={() => dropPeice(2)} />
            <button className="dropZoneButton" onClick={() => dropPeice(3)} />
            <button className="dropZoneButton" onClick={() => dropPeice(4)} />
            <button className="dropZoneButton" onClick={() => dropPeice(5)} />
            <button className="dropZoneButton" onClick={() => dropPeice(6)} />
          </div>
          <Grid board={board}/>
        </div>
    </div>
  );
}

export default App;
