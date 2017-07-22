function pluckByAttribute(arr, label) {
    return getTransformedArray(arr, (el)=> {
        return el[label];
    });
}

var presidents = [{name: "George", surname: "Kush"},
    {name: "Barako", surname: "Obaame"}];
console.log(pluckByAttribute(presidents, "name")); // -> ["George", "Barako"]
