import "colors";
import readline from "readline";
import fs from "fs/promises";
import { program } from "commander";

program.option('-f, --file [type]', 'file for saving game results', 'game_results.log');
program.parse(process.argv)

console.log(__dirname);
console.log(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let counter = 0;
let userName = null;

const mind = Math.ceil(Math.random() * 10);

const logFile = program.opts().file;

const isValidInputValue = (num) => {
    if (num < 1 || num > 10 || isNaN(num)) {
        console.log("Please provide a number, witch must be in range between 1 and 10");
        return false;
    }
    return true;
};

const logger = async (msg) => {
    try {
        console.log(msg.bgGreen.yellow.bold);
        await fs.appendFile(logFile, `${new Date().toLocaleString("uk-UA")} - ${msg}\n`);
    } catch (error) {
        console.log(error.message);
    }
};

 rl.question("Enter your name:\n", (value)=>{
        userName = value;
        game()
    });


const game = () => {
   

    rl.question("Please, enter any number from 1 to 10\n".green, (value) => {
        const number = +value;
        if (!isValidInputValue(number)) return game();

        counter += 1;

        if (number !== mind) {
            console.log("Wrong, number try again".bgRed.white);
            return game();
        }
        logger(`Congratulation, ${userName}!!! you guessed the number ${mind} in ${counter} attempts`);
        rl.close();
    });
};
game();
