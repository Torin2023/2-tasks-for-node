
// алгоритм поиска в ширину (BFS)

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getLab(n) {
  if (n === 0) {
    rl.close();
    go(); // ввод завершен, можно начинать
    return;
  }

  rl.question('', (line) => {
    lab.push(line.split(' ').map(Number));
    getLab(n - 1); // Рекурсивно вызываем функцию для получения следующего ввода
  });
}

let sizeN, sizeM, startX, startY, endX, endY;
let lab = [];

rl.question('', (size) => {
  [sizeN, sizeM] = size.split(' ').map(Number);
  rl.question('', (start) => {
    [startX, startY] = start.split(' ').map(Number);
    rl.question('', (end) => {
      [endX, endY] = end.split(' ').map(Number);
      getLab(sizeN);
    });
  });
});

function go() {
  // console.log(sizeN, sizeM, startX, startY, endX, endY);
  // console.log(lab);
  const result = findShortestPath(lab, startX, startY, endX, endY);
  console.log(String(result));
}

function findShortestPath(matrix, x1, y1, x2, y2) {
  const M = matrix[0].length;
  const N = matrix.length;

  if (x1 < 0 || x1 >= M || y1 < 0 || y1 >= N || x2 < 0 || x2 >= M || y2 < 0 || y2 >= N) {
    console.log("input error!", N, M);
    console.log(matrix, x1, y1, x2, y2);
    return 0; // Проверка на корректность входных координат
  }

  const queue = [{ x: x1, y: y1, distance: 0 }];
  const visited = new Array(N).fill(null).map(() => new Array(M).fill(false));

  visited[y1][x1] = true;

  while (queue.length > 0) {
    const { x, y, distance } = queue.shift();

    if (x === x2 && y === y2) {
      return distance; // Найден кратчайший путь
    }

    const neighbors = getNeighbors(x, y, M, N);

    for (const neighbor of neighbors) {
      const { nx, ny } = neighbor;

      if (!visited[ny][nx] && matrix[ny][nx] === 0) {
        visited[ny][nx] = true;
        queue.push({ x: nx, y: ny, distance: distance + 1 });
      }
    }
  }

  return 0; // Путь не найден
}

function getNeighbors(x, y, M, N) {
  const neighbors = [];

  if (x > 0) {
    neighbors.push({ nx: x - 1, ny: y }); // Верхняя соседняя ячейка
  }
  if (x < M - 1) {
    neighbors.push({ nx: x + 1, ny: y }); // Нижняя соседняя ячейка
  }
  if (y > 0) {
    neighbors.push({ nx: x, ny: y - 1 }); // Левая соседняя ячейка
  }
  if (y < N - 1) {
    neighbors.push({ nx: x, ny: y + 1 }); // Правая соседняя ячейка
  }

  return neighbors;
}
