export default Output;

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

