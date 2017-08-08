if (typeof module !== "undefined") {
    var extend = require('./functions.js').extend,
        inherit = require('./functions.js').inherit,
        Character = require('./Character.js'),
        Champion = require('./Champion.js'),
        Monster = require('./Monster.js');
}

//Testing script for my-Extend
console.log("\nTest Extend-----------------------");
var defaults = {width: 100, height: 100, obj: {a: 5, b: 6}};
var option = {
    width: 150, arr: [4, 5, 6], xm: function t(a) {
        return a / 2;
    }
};

var config = extend({}, defaults, option);

console.log(config);
defaults.obj.a = " sdfsdfsdfs fsdf ";
option.xm = {A: "XM"};
option.arr[2] = "Dfsdfsdf";
console.log(`\nafter change first-level full copy\n`);
console.log(config);
console.log("End test Extend -------------------------\n");


console.log("\n----Test Classes and Inheritance-----------------------");

let champConfigStrong = {
        name: "ChampionStrong",
        hitpoints: 1000,
        attack: 1000
    },
// no correct attack && no hitpoints
    champConfigWeak = {
        name: "weak Champion with default values of hitpoints and incorrect attack (in config) must take default",
        attack: "FSDFSDF"
    },
    monsterConfigStrong = {
        hitpoints: 1000,
        attack: 1000
    },
//no attack && no hitpoints
    monsterConfigWeak = {name: "weak monster with default values of attack and hitpoints"};


let championStrong = new Champion(champConfigStrong),
    championWeak = new Champion(champConfigWeak),
    monsterStrong = new Monster(monsterConfigStrong),
    monsterWeak = new Monster(monsterConfigWeak);

printStatusOfAll();

championStrong.fight(monsterWeak);
championWeak.defence();
monsterStrong.enrage();
monsterStrong.fight(championWeak);

printStatusOfAll();

championWeak.fight(monsterStrong);
championWeak.fight(monsterStrong);
championWeak.fight(monsterStrong);

monsterStrong.fight(championWeak);
printStatusOfAll();

monsterStrong.enrage();
monsterStrong.enrage();
championStrong.defence();
championStrong.defence();
printStatusOfAll();

monsterStrong.fight(championStrong);
monsterStrong.fight(championStrong);
championStrong.fight(monsterStrong);

function printStatusOfAll() {
    console.log("\nStatus\n");
    console.log(championStrong);
    console.log(championWeak);
    console.log(monsterStrong);
    console.log(monsterWeak);
    console.log();
}