const readline = require('readline');
const path = require('path');
const fs = require('fs');

const logFileName = process.argv[2];
if (!logFileName) {
  console.log('Вы не указали имя файла для логов!!!');
  process.exit(0);
}

const logFilePath = path.join(__dirname, '../', logFileName);

const recordLineInLogFile = (line, message = '') => {
  const currentContent = fs.readFileSync(logFilePath);
  fs.writeFileSync(logFilePath, `${currentContent}${line} \n`);
  if (message) console.log(message);
};

const isFileExists = fs.existsSync(logFilePath);
if (!isFileExists) fs.openSync(logFilePath, 'w');

recordLineInLogFile(
  isFileExists ? '' : `${new Date()} Файл создан`,
  `Ваш файл логов ${
    isFileExists ? 'распологается' : 'создан'
  } по адресу ${logFilePath}`,
);

const rl = readline.createInterface(process.stdin, process.stdout);

let randomBinaryNum;
recordLineInLogFile(`${new Date()} Утилита запущена`);

const newGame = () => {
  randomBinaryNum = Math.floor(Math.random() * 2) + 1;
  recordLineInLogFile(
    `Новая партия. Правильный ответ ${randomBinaryNum}. История:`,
  );
  rl.setPrompt('Новая партия. Угадайте число 1 или 2? ');
  rl.prompt();
};
newGame();

rl.on('line', (answer) => {
  if (answer === 'Выйти') rl.close();

  const answerNum = Number(answer);

  if (answerNum !== 1 && answerNum !== 2) {
    console.log('Ответ может быть только 1 или 2!');
    recordLineInLogFile('  Невалидные данные!');
    rl.setPrompt('Угадайте число 1 или 2? ');
    rl.prompt();
  } else if (answerNum === randomBinaryNum) {
    console.log('Вы выиграли!');
    recordLineInLogFile(`  Ответ ${answer}. Победа!`);
    newGame();
  } else {
    console.log('Вы проиграли!');
    recordLineInLogFile(`  Ответ ${answer}. Поражение!`);
    newGame();
  }
}).on('close', () => {
  recordLineInLogFile('  Партия не завершена!');
  recordLineInLogFile(`${new Date()} Утилита закрыта`);
  console.log('Удачного дня!');
  process.exit(0);
});
