Function.prototype.bindMe = function (context) {
    var self = this;
    return function (...args) {
        return self.apply(context, args);
    }
};
