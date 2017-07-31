function smallest(...arg) {
    return Math.min.apply(null, arg);
}

//  or
//function smallest() {
//    return Math.min.apply(null, Array.prototype.slice.call(arguments));
//}

if (typeof module !== "undefined") {
    module.exports = smallest;
}
