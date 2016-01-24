var Character = require('../src/character');
var ALIGNMENT = require('../src/alignment').ALIGNMENT;

describe('EverCraft iteration one -', function() {

  var me;
  var opponent;

  beforeEach(function() {
    me = new Character();
    me.setName('mike');
    opponent = new Character();
    opponent.setName('opponent');
  });

  it('can get name', function() {
    expect(me.getName()).toBe('mike');
  });

  it('can reset name', function() {
    me.setName('mike2');
    expect(me.getName()).toBe('mike2');
  });

  it('can set/get good/evil/neutral', function() {
    me.setAlignment(ALIGNMENT.GOOD);
    me.getAlignment(ALIGNMENT.GOOD);
    me.setAlignment(ALIGNMENT.EVIL);
    me.getAlignment(ALIGNMENT.EVIL);
    me.setAlignment(ALIGNMENT.NEUTRAL);
    me.getAlignment(ALIGNMENT.NEUTRAL);
  });

  it('cannot set alignment to illegal value', function() {
    var badInput = function () {
      me.setAlignment(ALIGNMENT.INVALID);
    };
    expect(badInput).toThrow();
  });

  it('verify armor class', function() {
    expect(me.getArmorClass()).toBe(10);
  });

  it('verify hit points', function() {
    expect(me.getHitPoints()).toBe(5);
  });

  it('hit opponent', function() {
    expect(me.hit(20, opponent)).toBe(true);
    expect(me.hit(3, opponent)).toBe(false);
  });

  it('successful hits until death', function() {
    expect(me.hit(15, opponent)).toBe(true);
    expect(opponent.getHitPoints()).toBe(4);
    me.hit(15, opponent);
    expect(opponent.getHitPoints()).toBe(3);
    expect(opponent.isAlive()).toBe(true);
    me.hit(15, opponent);
    me.hit(15, opponent);
    me.hit(15, opponent);
    expect(opponent.isAlive()).toBe(false);
  });

});
