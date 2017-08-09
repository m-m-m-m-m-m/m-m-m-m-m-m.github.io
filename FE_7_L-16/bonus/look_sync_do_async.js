var fs = require('fs');

function run (generator) {
    var it = generator(go);

    function go (err, result) {
        if (err) return it.throw(err);
        it.next(result);
    }

    go();
}

run(function* (done) {
    try{
        var dirFiles = yield fs.readdir('NoNoNoNo', done);
        var firstFile = dirFiles[0];
    }
    catch(err){
        firstFile = null;
    }

    console.log(firstFile);
});