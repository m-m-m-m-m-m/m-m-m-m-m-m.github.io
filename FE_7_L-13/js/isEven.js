function isEven(number) {
    var n = Math.abs(number);
    if (n > 1) {
        return isEven(n - 2)
    } else {
        return n === 0
    }
}

if (typeof module !== "undefined") {
    module.exports = isEven;
}
