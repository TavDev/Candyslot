type Candy = "🍬" | "🍭" | "🍫" | "🍩" | "🍪" | "🍒";

const ROWS = 5;
const COLS = 6;
const MIN_CLUSTER = 5; // Minimum candies in a cluster to win

function randomCandy(): Candy {
  const candies: Candy[] = ["🍬", "🍭", "🍫", "🍩", "🍪", "🍒"];
  return candies[Math.floor(Math.random() * candies.length)];
}

function generateBoard(): Candy[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, randomCandy)
  );
}

function printBoard(board: Candy[][]): void {
  for (const row of board) {
    console.log(row.join(" "));
  }
}

type Position = { row: number; col: number };

function findClusters(board: Candy[][]): Position[][] {
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const clusters: Position[][] = [];

  function dfs(r: number, c: number, candy: Candy, cluster: Position[]) {
    if (
      r < 0 ||
      r >= ROWS ||
      c < 0 ||
      c >= COLS ||
      visited[r][c] ||
      board[r][c] !== candy
    )
      return;
    visited[r][c] = true;
    cluster.push({ row: r, col: c });
    dfs(r - 1, c, candy, cluster);
    dfs(r + 1, c, candy, cluster);
    dfs(r, c - 1, candy, cluster);
    dfs(r, c + 1, candy, cluster);
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!visited[r][c]) {
        const cluster: Position[] = [];
        dfs(r, c, board[r][c], cluster);
        if (cluster.length >= MIN_CLUSTER) clusters.push(cluster);
      }
    }
  }
  return clusters;
}

function highlightBoard(board: Candy[][], clusters: Position[][]): string[][] {
  const marked = Array.from({ length: ROWS }, () =>
    Array(COLS).fill("")
  );
  for (const cluster of clusters) {
    for (const { row, col } of cluster) {
      marked[row][col] = "⭐️";
    }
  }
  return board.map((row, r) =>
    row.map((candy, c) => marked[r][c] ? marked[r][c] + candy : candy)
  );
}

function playCandyBonanza() {
  const board = generateBoard();
  console.log("Your Candy Bonanza board:");
  printBoard(board);

  const clusters = findClusters(board);
  if (clusters.length === 0) {
    console.log("No wins! Try again!");
  } else {
    console.log(`You have ${clusters.length} winning cluster(s)!`);
    const highlighted = highlightBoard(board, clusters);
    for (const row of highlighted) {
      console.log(row.join(" "));
    }
  }
}

playCandyBonanza();