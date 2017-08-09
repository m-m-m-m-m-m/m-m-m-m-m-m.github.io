const max = process.argv[2];
let FizzBuzz = {
    [Symbol.iterator]() {
        let current = 1;

        return {
            next() {
                if (current <= max) {
                    let res = current++;

                    if (res % 15 === 0) {
                        res = 'FizzBuzz';
                    } else if (res % 3 === 0) {
                        res = 'Fizz';
                    } else if (res % 5 === 0) {
                        res = 'Buzz';
                    }

                    return {
                        done: false,
                        value: res
                    };
                }
                return {done: true};
            }
        }
    }
};

for (var n of FizzBuzz) {
    console.log(n);
}