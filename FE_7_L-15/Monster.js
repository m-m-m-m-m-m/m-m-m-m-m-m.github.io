if (typeof module !== "undefined") {
    var inherit = require('./functions.js').inherit,
        Character = require('./Character.js');
}

function Monster() {
    Character.apply(this, arguments);
    this.type = "Monster";
    this.doubleDamage = 0;
}

inherit(Monster, Character);

Monster.prototype.enrage = function () {
    this.doubleDamage = 2;
};

Monster.prototype.getAttack = function () {
    let attack = this._super.getAttack.call(this);
    return (this.doubleDamage > 0) ? (this.doubleDamage--, attack * 2) : attack;
};

Monster.prototype.targetDefeated = function (target) {
    let targetTotalHitpoints = target.getTotalHitpoints();

    this._super.targetDefeated.apply(this, arguments);
    this.setTotalHitpoints(this.getTotalHitpoints() + getPercentsFrom(10, targetTotalHitpoints));
    this.restoreHitpoints(getPercentsFrom(25, targetTotalHitpoints));
};

Monster.prototype.restoreHitpoints = function (hitpoints) {
    this.setHitpoints(this.getHitpoints() + hitpoints);
};

function getPercentsFrom(perc, from) {
    return perc * from / 100;
}

if (typeof module !== "undefined") {
    module.exports = Monster
}
