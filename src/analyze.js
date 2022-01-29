const path = require('path');
const fs = require('fs');

const logFileName = process.argv[2];
if (!logFileName) {
  console.log('Вы не указали имя файла для логов!!!');
  process.exit(0);
}

const logFilePath = path.join(__dirname, '../', logFileName);

const logs = fs.readFileSync(logFilePath, 'utf8');

const getStrOccurenceCountInFile = (str) => {
  let indexOccurence = logs.indexOf(str, 0);
  let counter = 0;

  while (indexOccurence >= 0) {
    counter++;

    indexOccurence = logs.indexOf(str, indexOccurence + 1);
  }

  return counter;
};

const excessesCount = getStrOccurenceCountInFile('Утилита закрыта');
const gamesCount = getStrOccurenceCountInFile('Новая партия') - excessesCount;
const winsCount = getStrOccurenceCountInFile('Победа');
const defeatsCount = gamesCount - winsCount;
const winsPercent = Math.floor((winsCount / gamesCount) * 100);

console.log(
  `Количество игр: ${gamesCount}, Сотношение побед/поражений: ${winsCount}/${defeatsCount}, Процент побед: ~${winsPercent}%`,
);
