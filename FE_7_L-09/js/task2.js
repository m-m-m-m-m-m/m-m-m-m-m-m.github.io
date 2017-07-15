(function () {
    if( confirm("Чи бажаєте почати гру") ){
       let [number, number_range, prize_1, prize_2, prize_3, prize, attempt_counter] = [ , 5, 10, 5, 2, 0, 0];

        for (number = Math.round(Math.random() * number_range); attempt_counter < 3; attempt_counter++){
            console.log(`random number ${number}`);
            if( prompt(`введіть число від 0-${number_range}`) == number ){
                switch (attempt_counter){
                    case 0: 
                        prize += prize_1;
                        break;
                    case 1:
                        prize += prize_2;
                        break;
                    case 2:
                        prize += prize_3;
                        break;
                    default:
                        break;
                }

                if(confirm("Чи хоче користувач продовжити гру ?")){
                    ([number_range, attempt_counter, prize_1, prize_2, prize_3] = [ number_range*2, -1, prize_1*3, prize_2*3, prize_3*3]);
                    number = Math.round(Math.random() * number_range);
                } else {
                    console.log(`Дякуємо за гру, ваш виграш становить ${prize}$`);
                    break;
                }

            } else if (attempt_counter == 2){
                console.log("Ваш виграш - 0$");
                if(confirm("Чи хоче користувач зіграти ще раз ?")){
                    ([number_range, attempt_counter, prize_1, prize_2, prize_3, prize] = [5, -1, 10, 5, 2, 0]);
                    number = Math.round(Math.random() * number_range);
                } else {
                    break;
                }
            }
        }

    } else {
        console.log("Сьогодні ви не виграли мільйон, а могли");
    }

})();