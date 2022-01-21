#!/usr/bin/env node

const readline = require('readline');

const MAX_RANGE = 1000;
const GAP = 100;

const getRandomRange = () => {
    const max = Math.floor(Math.random() * (MAX_RANGE - GAP) + GAP);
    const min = max - GAP;

    return [min, max];
};

const getRandomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const [minRange, maxRange] = getRandomRange();
const randomInt = getRandomIntInRange(minRange, maxRange);

console.log(`Загадано число в диапазон от ${minRange} до ${maxRange}`);

const input = readline.createInterface(process.stdin, process.stdout);

input.on('line', (value) => {
    if (value === 'Выйти') {
        input.close();
        return;
    };

    const userNum = Number(value);
    if (Number.isNaN(userNum)) {
        console.log('Можно вводить только числа!');
    } else if (userNum < minRange || userNum > maxRange) {
        console.log(`Введите число в заданном диапазоне: от ${minRange} до ${maxRange}!`);
    } else if (userNum === randomInt) {
        console.log(`Отгадано число ${randomInt}!`);
        input.close();
    } else if (userNum < randomInt) {
        console.log('Больше');
    } else if (userNum > randomInt) {
        console.log('Меньше');
    } 
});
input.on('close', () => console.log('Программа завершена'));