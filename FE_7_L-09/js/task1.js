(function () {

    let [sh, sp] = ['#', ' '];
    sp = Number(sp);

    while(sp < 8){
        console.log(
            !( sp % 2 )
                ? `${sh} ${sh} ${sh} ${sh} `
                : ` ${sh} ${sh} ${sh} ${sh}`
        );
        sp++;
    }

})();