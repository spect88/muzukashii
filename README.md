# muzukashii - Japanese Text Difficulty Analyzer

Analyze Japanese texts to find out how difficult they are for foreign
readers.

Note that this library completely ignores vocabulary or grammar - it only
takes kanji into account.

Features:

* counts kanji per difficulty, ie. JLPT level or jouyou grade
* support for custom kanji groups (can be used for kanji from some
  Japanese textbook or just kanji you've learned)
* works in browsers (with browserify)

### Installation

```shell
npm install muzukashii
```

### Usage

```javascript
var muzukashii = require('muzukashii');

muzukashii.categorize('私');
// => { jlpt: 'n4', jlptVocabulary: 'n5', jouyou: '6' }

muzukashii.analyze('学生です');
/* =>
  { totalKanjiCount: 2,
    uniqueKanjiCount: 2,
    groups:
     { jlpt: { n5: 2 }, jlptVocabulary: { n5: 2 }, jouyou: { '1': 2 } },
    kanji:
     { '学': { jlpt: 'n5', jlptVocabulary: 'n5', jouyou: '1' },
       '生': { jlpt: 'n5', jlptVocabulary: 'n5', jouyou: '1' } } }
*/

var customAnalyzer = muzukashii.custom({
  someKanjiBook: {
    chapter1: '一ニ三四五六七八九十',
    chapter2: '東西南北左右'
  }
});

customAnalyzer.categorize('ニ');
// => { someKanjiBook: 'chapter1' }

customAnalyzer.analyze('一月');
/* =>
  { totalKanjiCount: 2,
    uniqueKanjiCount: 2,
    groups: { someKanjiBook: { chapter1: 1, unknown: 1 } },
    kanji:
     { '一': { someKanjiBook: 'chapter1' },
       '月': { someKanjiBook: 'unknown' } } }
*/
```

[More examples](spec/api.spec.js)

### License

The code is available under [MIT license](LICENSE).
