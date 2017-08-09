
function *flat(arr){
   for(let i of arr){
      if(Array.isArray(i)){
          yield *flat(i);
      } else {
          yield i;
      }
   }
}

var A = [1, [2, [3, 4], 5], 6];
for (var f of flat(A)) {
    console.log( f );
}                                  