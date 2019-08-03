const inquirer = require('inquirer'),
    chalk = require("chalk"),
    externalApi = require('./externalApi'),
    pad = require('pad');


const game ={
    initiateGame: function(){
        let word = '';
        console.log(chalk.magenta.bold('*******************************************'));
        console.log(chalk.magenta.bold('#######You are now entering the game!#######'));
        externalApi.hitApi('random').then(function (result) {
            word = result.word;
            // console.log('word is',word);
            game.getWord(word);
        });
    },
    getWord: function (word) {
        const questionInGame = [
            { type: 'input', name: 'userWord', message: 'Please enter the word' },
        ];
        inquirer
            .prompt(questionInGame)
            .then(function (answer) {
                if(answer.userWord == word){
                    console.log(chalk.green('Bingo!! You have won.'));
                }
                else{
                    game.afterInput(word);
                }

            });
        // process.exit(2);
    },
    afterInput:function(word){
        console.log(chalk.magenta.bold('*******************************************'))
        console.log(chalk.magenta.bold('#######Oops! That\'s a wrong answer!#######'))
        const retryOptions = [
            "Try again",
            "Hint",
            "Quit"
        ];
        const questionInGame = [
            { type: 'list', name: 'retryChoice', message: 'What would you like to do?',choices:retryOptions },
        ];
        inquirer
            .prompt(questionInGame)
            .then(function (answer) {
                if(answer.retryChoice == 'Try again'){
                    game.getWord(word);
                }
                else if (answer.retryChoice == 'Hint'){
                    console.log('Hint',word);
                    game.getWord(word);
                }
                else{
                    console.log('exit');
                    process.exit(2);
                }

            });
    }
}

module.exports = game;