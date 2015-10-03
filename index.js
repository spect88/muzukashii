'use strict';

var KanjiCategorizer = require('./lib/kanji-categorizer');
var buildAPI = require('./lib/api');

var defaultCategorizer;

function getDefaultCategorizer() {
  if (!defaultCategorizer) {
    var defaultKanjiGroups = require('./lib/kanji-groups.json');
    defaultCategorizer = new KanjiCategorizer(defaultKanjiGroups);
  }
  return defaultCategorizer;
}

module.exports = buildAPI(getDefaultCategorizer);

module.exports.custom = function(kanjiGroups) {
  var categorizer = new KanjiCategorizer(kanjiGroups);

  return buildAPI(function() {
    return categorizer;
  });
};
