# dictionary-tool
Command line dictionary tool and game.

### Installation

Assuming you already have nodejs environment.
```$xslt
npm install
```



### Definitions

> Definitions of a given word.

```$xslt
$ ./dict def <word>
```

### Synonyms

> Synonyms of a given word.

```$xslt
$ ./dict syn <word>
```


### Antonyms

> Antonyms of a given word.

```$xslt
$ ./dic ant <word>
```



### Examples

> Examples of a given word.

```$xslt
$ ./dict ex <word>
```

### Synonyms

> Synonyms of a given word.

```$xslt
$ node dict syn ${word}
```

### Antonyms

> Antonyms of a given word.

```$xslt
$ node dict ant ${word}
```

### Details

> Complete details of a given word.

```$xslt
$ ./dict <word> or ./dict dict <word>
```

### Word of day

> Complete details of word of the day.

```$xslt
$ ./dict
```


### Word guess(Game)

> Play a word guessing game.

```$xslt
$ ./dict play
```


### To directly use dict instead of ./dict
```
$ npm link
```
