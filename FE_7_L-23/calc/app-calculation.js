export default Calculation;

function Calculation(){
    var operations = {
        "+": add,
        "-": sub,
        "*": mul,
        "/": div
    };

    return {
        calc: calc,
        getOperations: function(){
            return operations;
        }
    };

    function calc(operation, operators){
        if(!operation || !(operation in operations)) return console.log(`Incorrect operation (${operation})`);
        if(!operators || operators.length < 2) return console.log(`Incorrect operators (${operators})`);

        return operations[operation](parseInt(operators[0]), parseInt(operators[1])).toFixed(4);
    }

    function add(a, b){
        return a + b;
    }

    function sub(a, b){
        return a - b;
    }

    function mul(a, b){
        return a * b;
    }

    function div(a, b){
        return a / b;
    }
}

