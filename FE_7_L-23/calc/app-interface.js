export default CalculatorInterface;

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

