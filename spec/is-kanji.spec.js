'use strict';

var expect = require('chai').expect;

var isKanji = require('../lib/is-kanji');

describe('isKanji', function() {
  it('detects kanji', function() {
    expect(isKanji('一')).to.be.true;
    expect(isKanji('い')).to.be.false;
    expect(isKanji('イ')).to.be.false;
    expect(isKanji('i')).to.be.false;
    expect(isKanji('-')).to.be.false;
    // this one is kana: U+30FC
    expect(isKanji('ー')).to.be.false;
  });
});
