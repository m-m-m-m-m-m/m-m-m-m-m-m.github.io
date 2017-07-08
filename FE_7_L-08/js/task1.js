(function () {
    let [a, b, c, D, res] = [
        _prompt('a'),
        _prompt('b'),
        _prompt('c')
    ];

    D = Math.pow(b, 2) - 4 * a * c;

    res = (D > 0)
        ? twoAnswers(a, b, D)
        : (D === 0)
        ? oneAnswer(a, b)
        : noAnswer(D);

    console.log(`Рівняння ${a}x\u00B2 + ${b}x + ${c} = 0 ${res}`);

    /////////////////////////////

    function _prompt(coef_type){
        let numb = prompt(`Enter coefficient ${coef_type}`);
        return isNaN(numb * 1)
            ? alert(`incorrect coef [${numb}] of ${coef_type}, coefficient must be a number`) || _prompt(coef_type)
            : +numb;
    }

    function twoAnswers(a, b, D){
        let res1 = (-b + Math.sqrt(D)) / (2 * a),
            res2 = (-b - Math.sqrt(D)) / (2 * a);

        return `має 2 розв'язки res=${res1}, res2=${res2}`;
    }

    function oneAnswer(a, b){
        let res = -b / (2 * a);
        return `має 1 розвя'зок res=${res}`;
    }

    function noAnswer(D){
        return `немає розв'язків D = ${D} < 0`;
    }

})();