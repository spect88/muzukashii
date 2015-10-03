'use strict';

var TextAnalyzer = require('./text-analyzer');

module.exports = function buildAPI(categorizerProvider) {
  return {
    categorize: function categorize(kanji) {
      return categorizerProvider().categorize(kanji);
    },
    analyze: function analyze(text) {
      var analyzer = new TextAnalyzer(categorizerProvider());
      return analyzer.analyze(text);
    }
  };
};
