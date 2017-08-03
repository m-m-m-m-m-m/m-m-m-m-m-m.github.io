if (typeof module !== "undefined") {
    var Casino = require('./Casino.js');
}

var casino = new Casino(3, 130239);
casino.debug.showAllMachineState();

console.log("play on machine #3");
casino.debug.getMachineByID(1).play(50).play(253).play("sd");
casino.debug.showAllMachineState();

console.log("remove machine #3");
casino.removeSlotMachineById(2);
casino.debug.showAllMachineState();

console.log("add new machine");
casino.addNewSlotMachine();
casino.debug.showAllMachineState();

console.log("play on machine #5");
for (let i = 0; i < 30; i++) {
    casino.debug.getMachineByID(1).play(50);
}
casino.debug.showAllMachineState();