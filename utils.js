const utils = {

    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    parseDefinitions: function (result) {
        let ret = '';
        result.forEach(function (item,index) {
            ret += (index+1) + `. ${item.text}\n`
        })
        return ret;
    },
    parseExamples: function (result) {
        let ret = '';
        result.examples.forEach(function (item,index) {
            ret += (index+1) + `. ${item.text}\n`
        })
        return ret;
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
            if(ret == ''){
                ret = 'Sorry! Synonym not found'
            }
        }
        catch (e) {
            ret = 'Sorry! Synonym not found'
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
            if(ret == ''){
                ret = 'Sorry! Antonym not found'
            }
        }
        catch (e) {
            ret = 'Sorry! Antonym not found'
        }
        return ret;
    }
}

module.exports = utils;