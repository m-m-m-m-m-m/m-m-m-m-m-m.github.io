import Output from './app-output.js';
import Calculation from './app-calculation.js';
import CalculatorInterface from './app-interface.js';

export default Calculator;


function Calculator(options){
  var output = new Output(options && options.output),
      calculation = new Calculation(),
      calcInterface = new CalculatorInterface({
          container: options && options.id,
          buttons: calculation.getOperations()
      });

    return {
        init : init,
        calculate : calc,
        clear : clear
    };

    function calc(operator){
        let res = calculation.calc(operator, calcInterface.getOperators());
        res &&  output.write(res);
    }

    function init(){
        calcInterface.init();
    }

    function clear(){
        output.clear();
        calcInterface.clear();
    }
}






