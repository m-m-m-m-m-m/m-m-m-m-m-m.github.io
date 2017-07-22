function forEach(arr, fn) {
    let i = 0,
        len = arr.length;

    for (; i < len; i++) {
        fn(arr[i], i, arr);
    }
}

forEach([3, 5, 2], function (el) {
    console.log(el)
});