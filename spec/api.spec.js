'use strict';

var expect = require('chai').expect;

var muzukashii = require('../index');

describe('Public API', function() {
  var api;

  describe('with default kanji groups', function() {
    beforeEach(function() {
      api = muzukashii;
    });

    it('categorizes kanji', function() {
      expect(muzukashii.categorize('私')).to.deep.equal({
        jlpt: 'n4',
        jlptVocabulary: 'n5',
        jouyou: '6'
      });
    });

    it('analyzes text', function() {
      expect(muzukashii.analyze('学生です')).to.deep.equal({
        totalKanjiCount: 2,
        uniqueKanjiCount: 2,
        groups: {
          jlpt: {n5: 2},
          jlptVocabulary: {n5: 2},
          jouyou: {1: 2}
        },
        kanji: {
          '学': {jlpt: 'n5', jlptVocabulary: 'n5', jouyou: '1'},
          '生': {jlpt: 'n5', jlptVocabulary: 'n5', jouyou: '1'}
        }
      });
    });
  });

  describe('with custom kanji groups', function() {
    beforeEach(function() {
      // Define your own custom groups like this:
      api = muzukashii.custom({
        learning: {
          knowPerfectly: '私愛声一ニ三四五六七八九十',
          usedToRemember: '結構学生',
          currentlyLearning: '東西左右'
        }
      });
    });

    it('categorizes kanji', function() {
      expect(api.categorize('九')).to.deep.equal({
        learning: 'knowPerfectly'
      });
      expect(api.categorize('生')).to.deep.equal({
        learning: 'usedToRemember'
      });
      expect(api.categorize('西')).to.deep.equal({
        learning: 'currentlyLearning'
      });
      expect(api.categorize('長')).to.deep.equal({
        learning: 'unknown'
      });
    });

    it('analyzes text', function() {
      var text = '私ひらがな西学生九引西';
      expect(api.analyze(text)).to.deep.equal({
        totalKanjiCount: 7,
        uniqueKanjiCount: 6,
        groups: {
          learning: {
            knowPerfectly: 2,
            usedToRemember: 2,
            currentlyLearning: 2, // because there's 2 西 in the text
            unknown: 1
          }
        },
        kanji: {
          '私': {learning: 'knowPerfectly'},
          '西': {learning: 'currentlyLearning'},
          '学': {learning: 'usedToRemember'},
          '生': {learning: 'usedToRemember'},
          '九': {learning: 'knowPerfectly'},
          '引': {learning: 'unknown'}
        }
      });
    });
  });
});
