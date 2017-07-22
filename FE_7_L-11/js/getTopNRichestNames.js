function getTopNRichestNames(number, arr) {
    let len = arr.length;

    number > len && (number = len);

    arr.sort((a, b)=> {
        return convertToNumb(b.income) - convertToNumb(a.income);
    });

    return pluckByAttribute(getTransformedArray(arr, (el, i)=> {
        return i < number && el;
    }), 'name');

    function convertToNumb(str) {
        let converter = {K: 'e3', M: 'e6', B: 'e9'};
        return Number(str.replace(/[KMB]/g, (matcher)=> {
            return converter[matcher];
        }));
    }
}

var people = [
    {name: 'Bara', income: '1B'},
    {name: 'Dara', income: '5B'},
    {name: 'Kara', income: '1M'},
    {name: 'Zara', income: '2K'}
];

console.log(getTopNRichestNames(2, people));
console.log(getTopNRichestNames(100, people));

