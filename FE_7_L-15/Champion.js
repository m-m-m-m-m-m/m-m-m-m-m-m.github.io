if (typeof module !== "undefined") {
    var inherit = require('./functions.js').inherit,
        Character = require('./Character.js');
}

function Champion() {
    Character.apply(this, arguments);
    this.type = "Champion";
    this.isDefenceOn = false;
}

inherit(Champion, Character);

Champion.prototype.rest = function () {
    this.setHitpoints(this.getHitpoints() + 5)
};

Champion.prototype.defence = function () {
    this.isDefenceOn || (this.isDefenceOn = true);
};

Champion.prototype.setHitpoints = function (hitpoints) {
    if (this.isDefenceOn) {
        this.isDefenceOn = false;
        return true;
    }
    return this._super.setHitpoints.call(this, hitpoints);
};

Champion.prototype.targetDefeated = function (target) {
    this._super.targetDefeated.apply(this, arguments);
    this.setAttack(this.getAttack() + 1);
};


if (typeof module !== "undefined") {
    module.exports = Champion
}
