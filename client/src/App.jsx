import './index.css'
import Tile from './tile'
import ChoiceTile from './choice-tile'

// Game state - READ ONLY
import { BOARD, makeMove, MAP_COLORS } from './state/game';
import { PREV1, PREV2, turn } from './state/game';


// React Hooks 
import { useState } from 'react'

function App() {
  const [board, setBoard] = useState(BOARD);

  function applyMove(color) {
    setBoard(makeMove(color));
  }

  function defineChoice(n) {
    if(n == PREV1 || n== PREV2) {
      return 'impossible-choice-tile';
    }
    return 'choice-tile';
  }

  var multiHeader = (turn) ? <p>Player 1</p> : <p>Player 2</p>;

  return (
    <div className="app">
      {/*Local Multiplayer header*/}
      <div>
        {multiHeader}
      </div>

      {/* Game Board */}
      <div className="board">
        {board.map((row, x) =>
          row.map((color, y) => (
            <Tile key={`${x}-${y}`} color={MAP_COLORS[color]}/>
          ))
        )}
      </div>

      {/* Choices */}
      <div id="choiceDiv">
          {MAP_COLORS.map((name, id) => (
            <ChoiceTile key={id} color={name} choice={defineChoice(id)} onClick={() => applyMove(id)} />    
          ))}
      </div>
    </div>
  );
}

export default App;