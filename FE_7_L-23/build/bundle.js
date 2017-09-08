var calc =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calc_app_js__ = __webpack_require__(1);


var calculators = {};

/* harmony default export */ __webpack_exports__["default"] = ({
    init: init,
    calc: calc,
    reset: reset
});

function init(options){
    var id = (options && options.container) || +(new Date());
    calculators[id] = new __WEBPACK_IMPORTED_MODULE_0__calc_app_js__["a" /* default */]({
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_output_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_calculation_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_interface_js__ = __webpack_require__(4);




/* harmony default export */ __webpack_exports__["a"] = (Calculator);


function Calculator(options){
  var output = new __WEBPACK_IMPORTED_MODULE_0__app_output_js__["a" /* default */](options && options.output),
      calculation = new __WEBPACK_IMPORTED_MODULE_1__app_calculation_js__["a" /* default */](),
      calcInterface = new __WEBPACK_IMPORTED_MODULE_2__app_interface_js__["a" /* default */]({
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








/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (Output);

function Output(nodeId){
    var modul_name = "Output",
        outputNode = document.getElementById(nodeId),
        write = outputNode ? domOutput : consoleOutput;

    return{
        write : write,
        clear : clearOutput
    };

    function consoleOutput(msg){
        console.log(modul_name, `:: ${msg}`);
    }

    function domOutput(msg){
        outputNode.innerHTML = msg;
    }

    function clearOutput(){
        outputNode ? domOutput('') : console.clear();
    }
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (Calculation);

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



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (CalculatorInterface);

function CalculatorInterface(options) {
    var container = options && getContainer(options.container),
        form;

    return {
        init : render,
        getOperators : getOperators,
        clear : clear
    };

    function render(){
        var div = document.createElement('div'),
            inputsId = container.id+"-inputs";
        div.innerHTML = `<div class="calculator-inputs">
            <form id="${inputsId}">
                <input name="a" type="text" placeholder="first numb">
                <input name="b" type="text" placeholder="second numb">
            </form>
        </div>
        <ul class="calculator-buttons">
            ${addButton()}
        </ul>`;

        div.classList.add('calculator');
        container.appendChild(div);
        form = document.getElementById(inputsId);
    }

    function addButton(){
        return options &&
            options.buttons &&
            Object.keys(options.buttons).reduce(function(buttons, button){
                return buttons + `<li onclick="calc.default.calc('${container.id}','${button}')" class="calculator-buttons-button" >${button}</li>`
            },"");
    }

    function getContainer(container) {
        container && addNew();
        return document.getElementById(container);

        function addNew() {
            var newContainer = document.createElement('DIV');
            newContainer.id = container;
            document.body.appendChild(newContainer);
        }
    }

    function clear(){
        form && form.reset();
    }

    function getOperators(){
        var a = form.a.value,
            b = form.b.value,
            operators=[];
        a && operators.push(a);
        b && operators.push(b);
        return operators;
    }
}



/***/ })
/******/ ]);