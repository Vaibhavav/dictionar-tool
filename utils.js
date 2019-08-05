const utils = {

    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    parseDefinitions: function (result) {
        try {
            let ret = '';
            result.forEach(function (item, index) {
                ret += (index + 1) + `. ${item.text}\n`
            });
            return ret;
        }catch (e) {
            return "Sorry! Definition not found."
        }
    },
    parseExamples: function (result) {
        try {
            let ret = '';
            result.examples.forEach(function (item, index) {
                ret += (index + 1) + `. ${item.text}\n`
            });
            return ret;
        }catch (e) {
            return "Sorry! Example not found."
        }
    },
    parseSynonym: function (result) {
        let ret = '';
        try {
            result.forEach(function (item) {
                if (item.relationshipType == 'synonym') {
                    item.words.forEach(function (word, index) {
                        ret += (index + 1) + `. ${utils.capitalizeFirstLetter(word)}\n`
                    })
                }
            });
            if (ret == '') {
                ret = "Sorry! Synonym not found\n"
            }
        } catch (e) {
            ret = "Sorry! Synonym not found\n"
        }
        return ret;
    },
    parseAntonym: function (result) {
        let ret = '';
        try {
            result.forEach(function (item) {
                if (item.relationshipType == 'antonym') {
                    item.words.forEach(function (word, index) {
                        ret += (index + 1) + `. ${utils.capitalizeFirstLetter(word)}\n`
                    })
                }
            });
            if (ret == '') {
                ret = "Sorry! Antonym not found\n"
            }
        } catch (e) {
            ret = "Sorry! Antonym not found\n"
        }
        return ret;
    },
    shuffle: function (array) {
        if(array.length <2){
            return array;
        }
        const originalArray = [...array];
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        if(originalArray == array){
            return utils.shuffle(array);
        }
        else {
            return array;
        }
    }
}

module.exports = utils;