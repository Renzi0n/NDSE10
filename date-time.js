#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const COMMANDS = {
    CURRENT: 'current',
    ADD: 'add',
    SUB: 'sub',
};

const getDateFromAgrs = (args) => {
    const defaultArgs = args._;
    const currentDate = new Date();

    if (defaultArgs.includes(COMMANDS.CURRENT)) {
        if (args.year || args.y) return currentDate.getFullYear();

        if (args.month || args.m) return currentDate.getMonth();
        
        if (args.date || args.d) return currentDate.getDate();
    
        return currentDate;
    }
    
    if (defaultArgs.includes(COMMANDS.ADD)) {
        if (args.year || args.y) currentDate.setFullYear(currentDate.getFullYear() + (args.year || args.y));

        if (args.month || args.m) currentDate.setMonth(currentDate.getMonth() + (args.month || args.m));
        
        if (args.date || args.d) currentDate.setDate(currentDate.getDate() + (args.date || args.d));
    };
    
    if (defaultArgs.includes(COMMANDS.SUB)) {
        if (args.year || args.y) currentDate.setFullYear(currentDate.getFullYear() - (args.year || args.y));

        if (args.month || args.m) currentDate.setMonth(currentDate.getMonth() - (args.month || args.m));
        
        if (args.date || args.d) currentDate.setDate(currentDate.getDate() - (args.date || args.d));
    };
    
    return new Date(currentDate);
};

const args = yargs(hideBin(process.argv)).argv;

console.log(getDateFromAgrs(args).toISOString());
