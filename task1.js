const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getInput(n) {
  if (n === 0) {
    rl.close();
    start(); // ввод завершен, можно начинать
    return;
  }

  rl.question('', (input) => {
    dimHeaps.push(+input);
    getInput(n - 1); // Рекурсивно вызываем функцию для получения следующего ввода
  });
}

let numHeaps, timeTotal;
let dimHeaps = [];

rl.question('', (line) => {
  [numHeaps, timeTotal] = line.split(' ').map(Number);
  if (numHeaps < 1 || timeTotal < 1) {
    console.log('Ошибка данных', numHeaps, timeTotal);
    rl.close();
  } else {
    getInput(numHeaps);
  }
});

function start() {
  dimHeaps = dimHeaps.filter((e) => e > 0); // убрали пустые
  if (timeTotal < dimHeaps.length) { console.log('0') } // решения нет
  else {
  const result = cookiesToTake(dimHeaps, timeTotal);
  console.log(String(result));
  }
}

function cookiesToTake(cookies, approaches) {

  let left = 1; // Минимальное значение К
  let right = Math.max(...cookies); // Максимальное значение К

  while (left < right) {
    let mid = Math.floor((left + right) / 2); // Среднее значение К

    let totalApproaches = 0; // Общее количество подходов
    for (let i = 0; i < cookies.length; i++) {
      totalApproaches += Math.ceil(cookies[i] / mid); // Рассчитываем количество подходов для каждого места
    }

    if (totalApproaches > approaches) {
      left = mid + 1; // Увеличиваем значение К
    } else {
      right = mid; // Уменьшаем значение К
    }
  }

  return left;
}
