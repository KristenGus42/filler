import './index.css'
import Tile from './tile'
import ChoiceTile from './choice-tile'

// Game state - READ ONLY
import { BOARD, makeMove, MAP_COLORS } from './state/game';
import { PREV } from './state/game';


// React Hooks 
import { useState } from 'react'

function App() {
  const [board, setBoard] = useState(BOARD);
  const [badMove, setBadMove] = useState("hidden");

  function applyMove(color) {
    setBoard(makeMove(color));
  }

  function defineChoice(n) {
    if(n == PREV) {
      return 'impossible-choice-tile';
    }
    return 'choice-tile';
  }

  return (
    <div className="app">
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