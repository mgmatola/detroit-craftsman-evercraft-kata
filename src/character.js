var ALIGNMENT = require('../src/alignment').ALIGNMENT;

var TYPICAL_DAMAGE = 1;
var DOUBLE_DAMAGE = 2;

function Character() {
  this.name = null;
  this.alignment = null;
  this.armorClass = 10;
  this.hitPoints = 5;
};

Character.prototype.setName = function(name) {
  this.name = name;
};

Character.prototype.getName = function() {
  return this.name;
};

Character.prototype.setAlignment = function(alignment) {
  if (!ALIGNMENT.hasOwnProperty(alignment.toUpperCase())) {
    throw new Error('Do not auto-create alignments');
  }
  this.alignment = alignment;
};

Character.prototype.getAlignment = function() {
  return this.alignment;
};

Character.prototype.getArmorClass = function() {
  return this.armorClass;
};

Character.prototype.getHitPoints = function() {
  return this.hitPoints;
};

Character.prototype.damage = function(amount) {
  this.hitPoints -= amount;
};

Character.prototype.isAlive = function() {
  return this.hitPoints > 1;
};

Character.prototype.attack = function (roll, opponent) {
  var success = roll >= opponent.getArmorClass();
  if (success) {
    roll === 20 ? opponent.damage(DOUBLE_DAMAGE) : opponent.damage(TYPICAL_DAMAGE);
  }
  return success;
};

module.exports = Character;
