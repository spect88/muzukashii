'use strict';

module.exports = function createLookupTable(kanjiList) {
  var lookup = {};
  for (var i = 0; i < kanjiList.length; i++) {
    lookup[kanjiList[i]] = true;
  }
  return lookup;
};
