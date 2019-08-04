const inquirer = require('inquirer'),
    chalk = require("chalk"),
    externalApi = require('./externalApi'),
    utils = require('./utils'),
    dict = require('./dict'),
    exec = require('child_process').exec;


const game = {
    initiateGame: async function () {
        console.log(chalk.magenta.bold('********************************************'));
        console.log(chalk.magenta.bold('#######You are now entering the game!#######'));
        let word = (await externalApi.hitApi('random')).word;
        let definitions = (await externalApi.hitApi('definitions', word)).map(function (item) {
            return utils.capitalizeFirstLetter(item.text);
        });
        let synonmys = [], antonyms = [];
        (await externalApi.hitApi('relatedWords', word)).map(function (item) {
            if (item.relationshipType == 'synonym') {
                item.words.forEach(function (word) {
                    synonmys.push(utils.capitalizeFirstLetter(word))
                })
            } else if (item.relationshipType == 'antonym') {
                item.words.forEach(function (word) {
                    antonyms.push(utils.capitalizeFirstLetter(word))
                })
            }
        });
        let examples = (await externalApi.hitApi('examples', word)).examples.map(function (item) {
            return utils.capitalizeFirstLetter(item.text);
        });
        let gameObj = {
            word: word,
            definitions: definitions,
            synonmys: synonmys,
            antonyms: antonyms,
            examples: examples,
            hintCount: {
                jumble: 1,
                definitions: definitions.length,
                synonmys: synonmys.length,
                antonyms: antonyms.length
            }
        };
        console.log(chalk.magenta.bold('********************************************'));
        console.log(chalk.yellow('Definition: '), definitions.splice(Math.floor(Math.random() * definitions.length), 1).toString());
        if (synonmys.length > 0 && antonyms.length > 0) {
            let random = Math.floor(Math.random() * 2);
            if (random) {
                console.log(chalk.yellow('Synonym: '), synonmys.splice(Math.floor(Math.random() * synonmys.length), 1).toString());
            } else {
                console.log(chalk.yellow('Antonym: '), antonyms.splice(Math.floor(Math.random() * antonyms.length), 1).toString());
            }
        } else if (synonmys.length > 0) {
            console.log(chalk.yellow('Synonym: '), synonmys.splice(Math.floor(Math.random() * synonmys.length), 1).toString());
        } else {
            console.log(chalk.yellow('Antonym: '), antonyms.splice(Math.floor(Math.random() * antonyms.length), 1).toString());
        }
        game.getWord(gameObj)
    },
    getWord: function (gameObj) {
        const questionInGame = [
            {type: 'input', name: 'userWord', message: 'Please enter the word'},
        ];
        inquirer
            .prompt(questionInGame)
            .then(function (answer) {
                if (answer.userWord.toLowerCase() == gameObj.word.toLowerCase() || gameObj.synonmys.indexOf(utils.capitalizeFirstLetter(answer.userWord.toLowerCase())) > -1) {
                    console.log(chalk.green('Bingo!! You have won.'));
                } else {
                    game.afterInput(gameObj);
                }

            });
        // process.exit(2);
    },
    afterInput: function (gameObj) {
        console.log(chalk.magenta.bold('*******************************************'))
        console.log(chalk.magenta.bold('#######Oops! That\'s a wrong answer!#######'))
        const retryOptions = [
            "Try again",
            "Hint",
            "Quit"
        ];
        const questionInGame = [
            {
                type: 'list',
                name: 'retryChoice',
                message: 'What would you like to do?',
                choices: retryOptions
            },
        ];
        inquirer
            .prompt(questionInGame)
            .then(function (answer) {
                if (answer.retryChoice == 'Try again') {
                    game.getWord(gameObj);
                } else if (answer.retryChoice == 'Hint') {
                    game.getHint(gameObj);
                } else {
                    exec('./dict dict '+ gameObj.word, function (result,error) {
                        console.log("The word was: ",utils.capitalizeFirstLetter(gameObj.word));
                        console.log(error)
                    });
                }

            });
    },
    getHint: async function (gameObj) {
        if (gameObj.hintCount.jumble > 0 || gameObj.hintCount.antonyms > 1 || gameObj.hintCount.synonmys > 1 || gameObj.hintCount.definitions > 1) {
            let randomHint = [];
            if (gameObj.hintCount.jumble > 0) {
                randomHint.push(1)
            }
            if (gameObj.hintCount.antonyms > 1) {
                randomHint.push(2)
            }
            if (gameObj.hintCount.synonmys > 1) {
                randomHint.push(3)
            }
            if (gameObj.hintCount.definitions > 1) {
                randomHint.push(4)
            }
            switch (utils.shuffle(randomHint)[0]) {
                case 1: {
                    gameObj.hintCount.jumble--;
                    console.log(chalk.blue('Hint - '),chalk.yellow('Jumbled Word: '), utils.shuffle(gameObj.word.split('')).join('').toString());
                    break;
                }
                case 2: {
                    gameObj.hintCount.antonyms--;
                    console.log(chalk.blue('Hint - '),chalk.yellow('Antonym: '), gameObj.antonyms.splice(Math.floor(Math.random() * gameObj.antonyms.length), 1).toString());
                    break;
                }
                case 3: {
                    gameObj.hintCount.synonmys--;
                    console.log(chalk.blue('Hint - '),chalk.yellow('Synonym: '), gameObj.synonmys.splice(Math.floor(Math.random() * gameObj.synonmys.length), 1).toString());
                    break;
                }
                default: {
                    gameObj.hintCount.definitions--;
                    console.log(chalk.blue('Hint - '),chalk.yellow('Definition: '), gameObj.definitions.splice(Math.floor(Math.random() * gameObj.definitions.length), 1).toString());
                    break;
                }
            }
            game.getWord(gameObj);
        } else {
            console.log(chalk.magenta.bold('***********************************'));
            console.log(chalk.magenta.bold('Sorry! You have used all the hints.'));
            game.getWord(gameObj);
        }
    }
}

module.exports = game;