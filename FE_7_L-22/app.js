function User() {
    this.lastVisitDate = function(){
        return new Date(2017, (Math.random() * 7) | 0, (Math.random() * 29) | 0);
    }();
    this.globalDiscount = function(){
        return (Math.random() * 1000) | 0;
    }();
    this.nightDiscount = function(){
        return (Math.random() * 1000) | 0;
    }();
    this.weekendDiscount = function(){
        return (Math.random() * 1000) | 0;
    }();
    this.ordersCount = function(){
        return (Math.random() * 10) | 0;
    }();
    this.ordersTotalPrice = function(){
        return (Math.random() * 10000) | 0;
    }();
    this.bonus = function(){
        return (Math.random() * 300) | 0;
    }();
}

User.decorators = {
    getDiscount : {
        getDiscount: function() {
            var today = new Date(/*2017, 9, 23, 23,30,15*/),
                isNight = today.getHours() > 22 || today.getHours() < 5,
                isWeekend = today.getDay() == 1 || today.getDay() == 2;

            return this.globalDiscount +  this.weekendDiscount * isWeekend + this.nightDiscount * isNight;
        }
    },
    getBonus : {
        getBonus: function() {
            var today = new Date(),
                dayDifference =  Math.ceil((today - this.lastVisitDate) / (1000 * 3600 * 24));

            if(dayDifference > 10) return this.bonus;

            this.bonus += 240 - (dayDifference * 24);
            this.ordersCount++;

            return this.bonus;
        }
    }
};

User.prototype.decorate = function (decorator) {
    var F = function () {},
        overrides = this.constructor.decorators[decorator],
        i,
        newobj;

    F.prototype = this;
    newobj = new F();
    newobj._super = F.prototype;

    for (i in overrides) {
        if (overrides.hasOwnProperty(i)) {
            newobj[i] = overrides[i];
        }
    }
    return newobj;
};

let newUser = new User();
console.log(newUser);

let newUserWithGetDiscount = newUser.decorate('getDiscount');
console.log("newUserWithGetDiscount", newUserWithGetDiscount, newUserWithGetDiscount.getDiscount());

let newUserWithGetDiscountAndGetBonus = newUserWithGetDiscount.decorate('getBonus');
console.log("newUserWithGetDiscountAndGetBonus",
             newUserWithGetDiscountAndGetBonus,
             newUserWithGetDiscountAndGetBonus.bonus,
             newUserWithGetDiscountAndGetBonus.getBonus());