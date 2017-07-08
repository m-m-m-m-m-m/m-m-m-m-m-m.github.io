(function () {
    let [euros, dollars, euroRate, dollarRate] = [
        _prompt("euros"),
        _prompt("dollars"),
        29.1,
        25.8
    ];

    alert(
        `${euros} euros are equal ${euros * euroRate} grns, ${dollars} dollars are equal ${dollars * dollarRate}, one euro is equal ${euroRate / dollarRate} dollars.`
    );

    function _prompt(type){
        let amount = prompt(`Enter amount of ${type}`);
        return isNaN(amount * 1)
            ? alert(`incorrect amount [${amount}] of ${type}, amount must be a number`) || _prompt(type)
            : +amount;
    }

})();