function askFoo() {
    return new Promise(function (resolve, reject) {
        resolve('foo');
    });
}

function run(generator) {
    var it = generator();

    let promise = it.next().value;
    promise.then(res => it.next(res))
        .catch(err => it.throw(err));
}

run(function* () {
    try {
        var foo = yield askFoo();
    }
    catch (err) {
        foo = err;
    }
    console.log(foo);
});
