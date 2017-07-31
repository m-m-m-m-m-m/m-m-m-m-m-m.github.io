function largest(...arg) {
    return Math.max.apply(null, arg);
}

//  or
//function largest() {
//    return Math.max.apply(null, Array.prototype.slice.call(arguments));
//}


if (typeof module !== "undefined") {
    module.exports = largest;
}
