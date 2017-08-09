const max = process.argv[2];

let FizzBuzz = function*(){
    let current = 1;
    while(current <= max){
        let res = current++;
        if (res % 15 === 0) {
            res = 'FizzBuzz';
        } else if (res % 3 === 0) {
            res = 'Fizz';
        } else if (res % 5 === 0) {
            res = 'Buzz';
        }
        yield res;
    }
}();

for (var n of FizzBuzz) {
    console.log(n);
}                                              