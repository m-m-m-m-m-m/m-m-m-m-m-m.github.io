function Character(config) {
    let defaults = {
        name: "anonim",
        attack: 10,
        hitpoints: 100
    };
    this.name = (config && config.name) || defaults.name;
    this.attack = (config && correctPropertyValue(config.attack, "attack") && config.attack) || defaults.attack;
    this.hitpoints = (config && correctPropertyValue(config.hitpoints, "hitpoints") && config.hitpoints) || defaults.hitpoints;
    this.currentHitpoints = this.hitpoints;
}

Character.prototype.toString = function () {
    return `${this.name}(${this.currentHitpoints}hp, ${this.type || ''})`;
};

Character.prototype.getHitpoints = function () {
    return this.currentHitpoints;
};

Character.prototype.setHitpoints = function (hitpoints) {
    if (!correctPropertyValue(hitpoints, "hitpoints")) return;
    this.currentHitpoints = (hitpoints <= this.hitpoints) ? Math.floor(hitpoints) : this.hitpoints;
    return true;
};

Character.prototype.getTotalHitpoints = function () {
    return this.hitpoints;
};

Character.prototype.setTotalHitpoints = function (totalHitpoints) {
    if (!correctPropertyValue(totalHitpoints, "total hitpoints")) return;
    this.hitpoints = Math.floor(totalHitpoints);
    return true;
};

Character.prototype.getAttack = function () {
    return this.attack;
};

Character.prototype.setAttack = function (attack) {
    if (!correctPropertyValue(attack, "attack")) return;
    this.attack = attack;
    return true;
};

Character.prototype.fight = function (target) {
    if (!targetAppropriate(this, target)) return;

    let damage = target.getHitpoints() - this.getAttack();
    target.setHitpoints(damage >= 0 ? damage : 0);

    if (!target.isAlive()) {
        this.targetDefeated && this.targetDefeated(target);
    }
};

Character.prototype.isAlive = function () {
    return this.currentHitpoints > 0;
};

Character.prototype.targetDefeated = function (target) {
    console.log(`Target ${target} defeated !`);
};

function correctPropertyValue(value, property) {
    if (value === undefined || value === null) return false;
    if (!isFinite(value) && isNaN(parseFloat(value))) {
        return console.log(`incorrect property |${property}->${value}|, must be number`);
    }
    if (!(value > -1)) {
        return console.log(`incorrect ${property}: ${value}, must be more than -1`);
    }
    return true;
}

function targetAppropriate(self, target) {
    return (self.isAlive() || console.log(`${self} can't attack after death :)`))
        && (target instanceof Character || console.log(`target ${target} is not correct Enemy`))
        && (target.isAlive() || console.log(`target ${target} -- is Dead`))
        && (self !== target || console.log(`you can't hurt yourself :)`));
}

if (typeof module !== "undefined") {
    module.exports = Character
}
