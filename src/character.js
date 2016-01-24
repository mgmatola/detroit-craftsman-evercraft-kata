var ALIGNMENT = require('../src/alignment').ALIGNMENT;

function Character() {
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

Character.prototype.decrementHitPoints = function() {
  this.hitPoints--;
};

Character.prototype.isAlive = function() {
  return this.hitPoints > 1;
};

Character.prototype.hit = function(roll, opponent) {
  var success = roll >= opponent.getArmorClass();
  if (success) {
    opponent.decrementHitPoints();
  }
  return success;
};

module.exports = Character;