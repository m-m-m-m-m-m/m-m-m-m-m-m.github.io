function compose(...fn) {
    return (...args) =>
        fn.reduceRight((prev_output, func) =>
            func.apply(null, toArray(prev_output)), args);

    function toArray(val) {
        return Array.isArray(val) ? val : [val];
    }
}

if (typeof module !== "undefined") {
    module.exports = compose;
}
