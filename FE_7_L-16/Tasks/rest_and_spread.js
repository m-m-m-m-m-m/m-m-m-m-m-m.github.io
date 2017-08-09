var rawArgs = process.argv.slice(2);
var args = [];

rawArgs.forEach(val => {
    let commaSep = val.split(',');
    commaSep.forEach(val => {
        if (val !== '') args.push(+val);
    });
});

function avg(...numbs) {
    return numbs.reduce((a, b)=>a + b, 0) / numbs.length;
}


console.log(avg(...args));