/**
 * Inheritance
 * @param {object} Child  - Child class
 * @param {object} Parent - Parent class
 */
function inherit(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.prototype._super = Parent.prototype;
}

/**
 * Extend of property, methods without prototype chain
 * (rewrite from left to right -> )
 * @param destinationObj - destination object to extend in
 * @param {array} sourceObjs - array of objects to extend from
 */
function extend(destinationObj, ...sourceObjs) {
    sourceObjs.forEach((obj)=> {
        Object.keys(obj).forEach((key)=> {
            let currentElement = obj[key];

            if (currentElement && currentElement !== null) {
                if (Array.isArray(currentElement)) {
                    destinationObj[key] = [...currentElement];
                    return;
                }

                if (typeof currentElement === 'function') {
                    destinationObj[key] = currentElement;
                    return;
                }

                if (currentElement instanceof Object) {
                    let keys = Object.keys(currentElement);
                    destinationObj[key] = {};

                    keys.forEach(function (k) {
                        destinationObj[key][k] = currentElement[k];
                    });
                    return;
                }

                destinationObj[key] = obj[key];
            }
        })
    });

    return destinationObj;
}

if (typeof module !== "undefined") {
    module.exports = {
        inherit: inherit,
        extend: extend
    };
}