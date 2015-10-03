'use strict';

module.exports = function isKanji(character) {
  var charCode = character.charCodeAt(0);
  return charCode >= 0x4E00 && charCode <= 0x9FBF;
};
