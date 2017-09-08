import Calculator from './calc/app.js';

var calculators = {};

export default {
    init: init,
    calc: calc,
    reset: reset
}

function init(options){
    var id = (options && options.container) || +(new Date());
    calculators[id] = new Calculator({
        id : id,
        output: "output"
    });
    calculators[id].init();
}

function reset(id){
    calculators[id] && calculators[id].clear();
}

function calc(id, operator){
    calculators[id] && calculators[id].calculate(operator);
}