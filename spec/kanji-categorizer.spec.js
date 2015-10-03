'use strict';

var expect = require('chai').expect;

var KanjiCategorizer = require('../lib/kanji-categorizer');
var kanjiGroups = require('../lib/kanji-groups');

describe('Kanji Categorizer', function() {
  describe('with default kanji groups', function() {
    var categorizer = new KanjiCategorizer(kanjiGroups);

    it('returns JLPT level of kanji', function() {
      expect(categorizer.categorize('父').jlpt).to.equal('n5');
      expect(categorizer.categorize('私').jlpt).to.equal('n4');
      expect(categorizer.categorize('婚').jlpt).to.equal('n3');
      expect(categorizer.categorize('灰').jlpt).to.equal('n2');
      expect(categorizer.categorize('結').jlpt).to.equal('n1');
      expect(categorizer.categorize('庵').jlpt).to.equal('unknown');
    });

    it('returns first JLPT level which includes vocabulary' +
      'containing given Kanji', function() {
      expect(categorizer.categorize('灰').jlptVocabulary).to.equal('n5');
      expect(categorizer.categorize('婚').jlptVocabulary).to.equal('n5');
      expect(categorizer.categorize('軒').jlptVocabulary).to.equal('n4');
      expect(categorizer.categorize('譲').jlptVocabulary).to.equal('n3');
      expect(categorizer.categorize('燭').jlptVocabulary).to.equal('n2');
      expect(categorizer.categorize('亜').jlptVocabulary).to.equal('n1');
      expect(categorizer.categorize('庵').jlptVocabulary).to.equal('unknown');
    });

    it('returns jouyou grade (or general-use/jinmeiyou) of kanji', function() {
      expect(categorizer.categorize('火').jouyou).to.equal('1');
      expect(categorizer.categorize('父').jouyou).to.equal('2');
      expect(categorizer.categorize('岸').jouyou).to.equal('3');
      expect(categorizer.categorize('結').jouyou).to.equal('4');
      expect(categorizer.categorize('河').jouyou).to.equal('5');
      expect(categorizer.categorize('私').jouyou).to.equal('6');
      expect(categorizer.categorize('婚').jouyou).to.equal('general-use');
      expect(categorizer.categorize('庵').jouyou).to.equal('jinmeiyou');
    });
  });
});
