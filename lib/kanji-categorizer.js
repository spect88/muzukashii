'use strict';

var createLookupTable = require('./lookup-table');

function initLookup(groups) {
  return Object.keys(groups)
    .map(function(groupName) {
      var categories = groups[groupName];
      var lookupTables = Object.keys(categories)
        .map(function(categoryName) {
          var kanjiList = categories[categoryName];
          var lookup = createLookupTable(kanjiList);
          return [categoryName, lookup];
        });

      var categorize = function categorize(kanji) {
        return lookupTables
          .reduce(function(category, categoryLookup) {
            if (category) return category;
            if (categoryLookup[1][kanji]) {
              return categoryLookup[0];
            }
          }, null);
      };

      return [groupName, categorize];
    });
}

function KanjiCategorizer(kanjiGroups) {
  this.lookup = initLookup(kanjiGroups);
}

KanjiCategorizer.prototype.categorize = function(kanji) {
  return this.lookup.reduce(function(result, groupCategorizer) {
    var groupName = groupCategorizer[0];
    var categorizer = groupCategorizer[1];

    result[groupName] = categorizer(kanji) || 'unknown';
    return result;
  }, {});
};

module.exports = KanjiCategorizer;
