'use strict';

var isKanji = require('./is-kanji');

function TextAnalyzer(kanjiCategorizer) {
  this.categorizer = kanjiCategorizer;
}

TextAnalyzer.prototype._categorizeKanjiInText = function(text) {
  return text.split('')
    .filter(isKanji)
    .map(function(kanji) {
      return {
        kanji: kanji,
        categories: this.categorizer.categorize(kanji)
      };
    }, this);
};

TextAnalyzer.prototype._aggregateGroupStats = function(categorizedKanji) {
  return categorizedKanji
    .map(function(kanjiAndCategories) {
      return kanjiAndCategories.categories;
    })
    .reduce(function(groupStats, categories) {
      Object.keys(categories).forEach(function(groupName) {
        if (!groupStats[groupName]) groupStats[groupName] = {};

        var category = categories[groupName];
        if (!groupStats[groupName][category]) {
          groupStats[groupName][category] = 1;
        } else {
          groupStats[groupName][category]++;
        }
      });
      return groupStats;
    }, {});
};

TextAnalyzer.prototype.analyze = function(text) {
  var categorizedKanji = this._categorizeKanjiInText(text);

  var categoriesPerKanji = categorizedKanji
    .reduce(function(hash, kanjiAndCategories) {
      hash[kanjiAndCategories.kanji] = kanjiAndCategories.categories;
      return hash;
    }, {});

  var groupStats = this._aggregateGroupStats(categorizedKanji);

  return {
    totalKanjiCount: categorizedKanji.length,
    uniqueKanjiCount: Object.keys(categoriesPerKanji).length,
    groups: groupStats,
    kanji: categoriesPerKanji
  };
};

module.exports = TextAnalyzer;
