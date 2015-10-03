'use strict';

var expect = require('chai').expect;

var KanjiCategorizer = require('../lib/kanji-categorizer');
var defaultKanjiGroups = require('../lib/kanji-groups.json');
var defaultCategorizer = new KanjiCategorizer(defaultKanjiGroups);

var TextAnalyzer = require('../lib/text-analyzer');

describe('Text Analyzer', function() {
  var analyzer, output;

  // text contains 11 kanji in total
  var example =
   '雪がはげしく降っていました。' +
   'ネロはその絵をおおっていた覆い布をさっと取りました。' +
   '生涯ずっと、彼らは一緒でした。';

  beforeEach(function() {
    analyzer = new TextAnalyzer(defaultCategorizer);
    output = analyzer.analyze(example);
  });

  it('returns total number of kanji in the text', function() {
    expect(output.totalKanjiCount).to.equal(11);
  });

  it('returns total number of unique kanji in the text', function() {
    expect(output.uniqueKanjiCount).to.equal(11);
  });

  it('returns number of kanji per level in each group', function() {
    expect(output.groups.jlpt).to.deep.equal({
      n5: 2,
      n3: 6,
      n2: 1,
      n1: 2
    });
    expect(output.groups.jlptVocabulary).to.deep.equal({
      n5: 8,
      n4: 1,
      n3: 1,
      unknown: 1
    });
    expect(output.groups.jouyou).to.deep.equal({
      1: 2,
      2: 2,
      3: 1,
      5: 1,
      6: 1,
      'general-use': 4
    });
  });

  it('categorizes all the kanji in the text', function() {
    expect(output.kanji['生']).to.deep.equal({
      jlpt: 'n5',
      jlptVocabulary: 'n5',
      jouyou: '1'
    });
    expect(output.kanji['覆']).to.deep.equal({
      jlpt: 'n1',
      jlptVocabulary: 'n3',
      jouyou: 'general-use'
    });
  });
});
