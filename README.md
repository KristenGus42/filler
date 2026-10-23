# Color Filler

Color Filler is a local, two-player territory game inspired by the color-grabbing gameplay of Filler in GamePigeon. Players share one screen and take turns expanding their regions across a randomly generated board.

## How to Play

- Each player starts in an opposite corner of the 7-by-8 board.
- On your turn, choose one of the available colors to change your region's color and absorb neighboring tiles of that color.
- You cannot choose either player's current color, so each move is a choice between growing your region and limiting your opponent's options.
- The board uses six colors, with at least eight tiles of each color and no matching colors adjacent at the start.

The goal is to claim as much of the board as possible. The game is currently designed for local play on one device.

## Run Locally

You need Node.js and npm installed. Vite is included as a project dependency, so there is no need to install it globally.

From the `client` directory, install the dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite in your browser. To stop the server, press `Ctrl+C` in the terminal.

Other available commands:

```sh
npm run build  # Create a production build in dist/
npm run lint   # Run ESLint
```

## Future Plans

- Online multiplayer so players can compete from separate devices.
- A fully functional bot opponent for solo play.
