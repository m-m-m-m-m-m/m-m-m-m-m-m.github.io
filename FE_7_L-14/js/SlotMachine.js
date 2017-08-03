function SlotMachine(amountOfMoney) {
    (SlotMachine.uniqId === undefined) && (SlotMachine.uniqId = 0);

    let id, money, isLucky, playOptions;

    initSlotMachine();

    return {
        getAmountOfMoney: getTotal,
        takeMoney: takeMoney,
        putMoney: putMoney,
        play: play,
        getId: returnCurrentMachineId,
        setLucky: setLucky,
        isLucky : ()=> isLucky
    };

    ////////////////////////////////////////////////////////////

    function initSlotMachine() {
        id = SlotMachine.uniqId++;
        money = isMoney(amountOfMoney) ? amountOfMoney : console.log("incorrect amount of money") || 0;
        isLucky = false;
        playOptions = {
            loss: playerLoss,
            x2: x2Prize,
            x5: x5Prize,
            jackpot: jackpot
        };
    }

    function getTotal() {
        return money;
    }

    function isMoney(money) {
        return !isNaN(parseFloat(money)) && isFinite(money) && money >= 0;
    }

    function enoughMoney(sum) {
        return money - sum >= 0
    }

    function takeMoney(amount) {
        if (!isMoney(amount)) return console.log("incorrect amount of money to take");
        if (!enoughMoney(amount)) return console.log("machine doesn't contain enough amount of money");

        money -= amount;
        return amount;
    }

    function putMoney(amount) {
        if (!isMoney(amount)) return console.log("incorrect bet for play");
        money += amount;
        return true;
    }

    function doubleDigits(str) {
        return (/([0-9]).*?\1/).test(str);
    }

    function tripleDigits(str) {
        return /^([0-9])\1+$/.test(str);
    }

    function parseResult(result) {
        displayResult(result);
        if (tripleDigits(result)) {
            return (result === "777") ? "jackpot" : "x5";
        }
        return doubleDigits(result) ? "x2" : "loss";
    }

    function randomDigits() {
        let spin = ("" + Math.random()).slice(2, 5);
        return (spin === "777" && isLucky)
            ? randomDigits()
            : spin;
    }

    // chaining
    function play(playerBet) {
        if (!isMoney(playerBet)) return console.log("incorrect bet for play") || this;
        if (putMoney(playerBet)) {
            console.log(`\nBet: <- ${playerBet}`);
            let playResult = parseResult(randomDigits());

            console.log(`Result: -> ${playOptions[playResult](playerBet)}`);

        }
        return this;
    }

    function playerLoss(bet) {
        return 0;
    }

    function prizeTransaction(prize) {
        let availableAmount = takeMoney(prize);

        if (availableAmount === undefined) {
            console.log(`Player can get prize ${prize}$ in reception`);
            return `Prize bill for ${prize}$`;
        }

        console.log(`Player win !!!`);
        return availableAmount;
    }

    function x2Prize(bet) {
        return prizeTransaction(bet * 2);
    }

    function x5Prize(bet) {
        return prizeTransaction(bet * 5);
    }

    function jackpot() {
        let allMachineMoney = takeMoney(money);
        console.log(`Unbelievable !!! Jackpot ${allMachineMoney}`);
        return allMachineMoney;
    }

    function setLucky(val) {
        isLucky = !!val;
        return this;
    }

    function returnCurrentMachineId() {
        return id;
    }

    function displayResult(res) {
        console.log(`   [ ${res[0]} | ${res[1]} | ${res[2]} ]`)
    }
}


if (typeof module !== "undefined") {
    module.exports = SlotMachine;
}
