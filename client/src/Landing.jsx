import './index.css'
import Tile from './tile'
import ChoiceTile from './choice-tile'

// Game state - READ ONLY
import { BOARD, makeMove, MAP_COLORS } from './state/game';
import { PREV1, PREV2, turn } from './state/game';


// React Hooks 
import { useState } from 'react'

function App() {
  

  return (
    <div>
      {/*Landing Page*/}
      <div>
        {multiHeader}
      </div>
    </div>
  );
}

export default App;