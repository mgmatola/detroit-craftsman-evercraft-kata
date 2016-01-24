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

  it('Create a Character - can get name', function() {
    expect(me.getName()).toBe('mike');
  });

  it('Create a Character - can reset name', function() {
    me.setName('mike2');
    expect(me.getName()).toBe('mike2');
  });

  it('Alignment - can set/get good/evil/neutral', function() {
    me.setAlignment(ALIGNMENT.GOOD);
    me.getAlignment(ALIGNMENT.GOOD);
    me.setAlignment(ALIGNMENT.EVIL);
    me.getAlignment(ALIGNMENT.EVIL);
    me.setAlignment(ALIGNMENT.NEUTRAL);
    me.getAlignment(ALIGNMENT.NEUTRAL);
  });

  it('Alignment - cannot set alignment to illegal value', function() {
    var badInput = function () {
      me.setAlignment(ALIGNMENT.INVALID);
    };
    expect(badInput).toThrow();
  });

  it('Armor Class & Hit Points - verify armor class', function() {
    expect(me.getArmorClass()).toBe(10);
  });

  it('Armor Class & Hit Points - verify hit points', function() {
    expect(me.getHitPoints()).toBe(5);
  });

  it('Character Can Attack/Be Damaged - successful hit 20', function() {
    expect(me.attack(20, opponent)).toBe(true);
    expect(opponent.getHitPoints()).toBe(3);
  });

  it('Character Can Attack/Be Damaged - successful hit 10', function() {
    expect(me.attack(10, opponent)).toBe(true);
    expect(opponent.getHitPoints()).toBe(4);
  });

  it('Character Can Attack/Be Damaged - unsuccessful hit 3', function() {
    expect(me.attack(3, opponent)).toBe(false);
    expect(opponent.getHitPoints()).toBe(5);
  });

  it('Character Can Be Damaged - successful hits until death', function() {
    expect(me.attack(15, opponent)).toBe(true);
    expect(opponent.getHitPoints()).toBe(4);
    me.attack(15, opponent);
    expect(opponent.getHitPoints()).toBe(3);
    expect(opponent.isAlive()).toBe(true);
    me.attack(15, opponent);
    me.attack(15, opponent);
    me.attack(15, opponent);
    expect(opponent.isAlive()).toBe(false);
  });

  it('Character Can Be Damaged - double damage until (negative) death', function() {
    me.attack(20, opponent);
    expect(opponent.getHitPoints()).toBe(3);
    me.attack(20, opponent);
    me.attack(20, opponent);
    expect(opponent.getHitPoints()).toBe(-1);
    expect(opponent.isAlive()).toBe(false);
  });
});
