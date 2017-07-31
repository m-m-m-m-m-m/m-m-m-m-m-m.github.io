var fibonacci = (function () {
    var memo = {0: 0, 1: 1};

    function f(n) {
        if (n in memo) {
            return memo[n];
        } else {
            memo[n] = f(n - 1) + f(n - 2);
            return memo[n];
        }
    }

    return f;
})();

if (typeof module !== "undefined") {
    module.exports = fibonacci;
}
