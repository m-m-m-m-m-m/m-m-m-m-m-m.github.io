if (typeof module !== "undefined") {
    var SlotMachine = require('./SlotMachine.js');
}

function Casino(slotMachinesAmount, casinoMoney) {
    let slotMachines = [],
        money;

    initCasino();

    return {
        getTotalAmountOfMoney: getTotalAmountOfMoney,
        getTotalNumberOfMachines: getTotalNumberOfMachines,
        addNewSlotMachine: addNewSlotMachine,
        removeSlotMachineById: removeSlotMachineById,
        takeTheMoneyFromTheCasino: takeTheMoneyFromTheCasino,
        debug: {
            showAllMachineState: ()=> {
                console.log("\nMachines State: ");
                slotMachines.forEach((m)=> {
                    console.log(`id: ${m.getId()}, isLucky ${m.isLucky()}, ${m.getAmountOfMoney()}`);
                });
                console.log(`\nCasino State: \n  Money ${getTotalAmountOfMoney()}, Machines ${getTotalNumberOfMachines()}\n\n`);
            },
            getMachineByID: (id)=> {
                return slotMachines[findMachineIndexById(id)];
            }
        }
    };

    //////////////////////////////////////////////////////

    function initCasino() {
        let minMoneyAmount = 1,
            countOfMachines = Math.floor(slotMachinesAmount);
        money = Math.floor(casinoMoney);

        if (countOfMachines < 1) {
            throw new Error("Amount of slot Machines must be > 0");
        }
        if (money < (countOfMachines * minMoneyAmount)) {
            throw new Error(`Amount of money must be >= ${countOfMachines * minMoneyAmount}`);
        }

        for (let i = 0; i < countOfMachines; i++) {
            slotMachines.push(new SlotMachine(0));
        }
        spreadMoney(money);
        slotMachines[RandomLuckyMachine()].setLucky(true);
    }

    function RandomLuckyMachine() {
        return Math.floor(Math.random() * (getTotalNumberOfMachines() - 1));
    }

    function spreadMoney(amount) {
        let count = getTotalNumberOfMachines(), q, equalAmount;
        if (getTotalNumberOfMachines() > 0) {
            q = amount % count;
            equalAmount = (amount - q) / count;
            slotMachines[0].putMoney(q);
            slotMachines.forEach((machine)=>machine.putMoney(equalAmount));
        }
    }

    function getTotalAmountOfMoney() {
        return slotMachines.reduce((totalMoney, machineMoney)=> totalMoney + machineMoney.getAmountOfMoney(), 0);
    }

    function getTotalNumberOfMachines() {
        return slotMachines.length;
    }

    function addNewSlotMachine() {
        let richestMachine = slotMachines.sort(richestSortFunc)[0];
        slotMachines.push(new SlotMachine(richestMachine.takeMoney(richestMachine.getAmountOfMoney() / 2)));
    }

    function richestSortFunc(a, b) {
        return b.getAmountOfMoney() - a.getAmountOfMoney();
    }

    function removeSlotMachineById(id) {
        if (getTotalNumberOfMachines() < 2) return console.log("There aren't any SlotMachine to remove");

        let machine_index = findMachineIndexById(id);

        if (!machine_index) return console.log(`There isn't SlotMachine with id ${id}`);

        let removedMachine = slotMachines.splice(machine_index, 1)[0];
        spreadMoney(removedMachine.takeMoney(removedMachine.getAmountOfMoney()));
        return true;
    }

    function findMachineIndexById(id) {
        let search = slotMachines.findIndex((el) => el.getId() == id);
        return (search !== -1) ? search : console.log(`Unable to Machine with id: ${id}`);
    }

    function takeTheMoneyFromTheCasino(amount) {
        let money = availableAmountToTake(amount);
        if (!money) {
            console.log(`Amount ${amount} is bigger than available in Casino ${getTotalAmountOfMoney()}`);
        }

        takeFromRichest(slotMachines, amount);

        return amount;

        function takeFromRichest(arr, amount) {
            let i = 0, len = arr.length;
            arr.sort(richestSortFunc);

            for (; i < len && amount !== 0; i++) {
                let availableMoney = arr[i].getAmountOfMoney();
                amount -= arr[i].takeMoney((amount >= availableMoney) ? availableMoney : amount);
            }
        }
    }

    function availableAmountToTake(amount) {
        let amountToTake = getTotalAmountOfMoney() - amount;
        return amountToTake > 0 ? amountToTake : false;
    }
}

if (typeof module !== "undefined") {
    module.exports = Casino;
}
