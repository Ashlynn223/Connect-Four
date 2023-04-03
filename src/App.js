import { useState } from 'react'
import './App.css';

function App() {
  const [ p1PeicesLeft, setP1PeicesLeft ] = useState(21);
  const [ p2PeicesLeft, setP2PeicesLeft ] = useState(21);
  const [ currentPlayer, setPlayer ] = useState(1);

  const peiceDropped = ({ player }) => {
    if (player == 1) {
      setP1PeicesLeft(p1PeicesLeft - 1)
      setPlayer(2)
    } else {
      setP2PeicesLeft(p2PeicesLeft - 1)
      setPlayer(1)
    }
  };

  return (
    <div onMouseUp={() => peiceDropped({ player: currentPlayer })} className='dropzone'>
      Drop Zone
    </div>
  );
}

export default App;
