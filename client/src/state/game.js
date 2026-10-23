// 1. Constants
const BOARD_HEIGHT = 7;
const BOARD_LENGTH = 8;
const COLORS = [0, 1, 2, 3, 4, 5];
export const MAP_COLORS = ["red", "green", "yellow", "blue", "purple", "black"];

// 2. State
export var PREV1 = 0;
export var PREV2 = 0;
export var PLAYER1 = [];   // array of [x, y] pairs
export var PLAYER2 = [];
export var turn = true;

// has: is [x, y] already in this list of pairs?
const has = (list, x, y) => list.some(([px, py]) => px === x && py === y);

const shuffle = items => {
    for (let index = items.length - 1; index > 0; index--) {
        const otherIndex = Math.floor(Math.random() * (index + 1));
        [items[index], items[otherIndex]] = [items[otherIndex], items[index]];
    }
    return items;
};

// 3. Build the board
export const BOARD = buildBoard();

export function buildBoard() {
    const cellCount = BOARD_HEIGHT * BOARD_LENGTH;
    const minimumCount = 8;
    let remainingCounts;
    do {
        remainingCounts = Array(COLORS.length).fill(minimumCount);
        const extras = shuffle([
            ...Array(cellCount - minimumCount * COLORS.length).fill(true),
            ...Array(COLORS.length - 1).fill(false),
        ]);
        let colorIndex = 0;
        for (const isExtra of extras) {
            if (isExtra) remainingCounts[colorIndex]++;
            else colorIndex++;
        }
    } while (Math.max(...remainingCounts) > Math.floor(cellCount / 2));

    const board = Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_LENGTH).fill(null));
    const placeNext = index => {
        if (index === cellCount) return true;

        const x = Math.floor(index / BOARD_LENGTH);
        const y = index % BOARD_LENGTH;
        const unavailableColors = [board[x - 1]?.[y], board[x][y - 1]];
        const candidates = shuffle(COLORS.filter(color =>
            remainingCounts[color] > 0 && !unavailableColors.includes(color)
        ));
        candidates.sort((first, second) => remainingCounts[second] - remainingCounts[first]);

        for (const color of candidates) {
            board[x][y] = color;
            remainingCounts[color]--;
            if (placeNext(index + 1)) return true;
            remainingCounts[color]++;
            board[x][y] = null;
        }
        return false;
    };

    placeNext(0);
    PREV1 = board[BOARD_HEIGHT - 1][0];
    PREV2 = board[0][BOARD_LENGTH - 1];

    PLAYER1.push([BOARD_HEIGHT - 1, 0]);
    PLAYER2.push([0, BOARD_LENGTH - 1]);
    return board;
}

export function makeMove(absorbColor) {
    var player = PLAYER2
    if(turn) player = PLAYER1;

    const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

    if(turn) {
        PREV1 = absorbColor;
    } else PREV2 = absorbColor;

    // Set all current colors to the new absorb color
    for (const [x, y] of player) {
        BOARD[x][y] = absorbColor;

        for (const [dx, dy] of DIRS) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= BOARD_HEIGHT || ny < 0 || ny >= BOARD_LENGTH) continue;
            if (BOARD[nx][ny] == absorbColor && !has(player, nx, ny)) {
                player.push([nx, ny]);
            }
        }
    }

    turn = (!turn);
    return BOARD.map(row => [...row]); // new array to appease react
}