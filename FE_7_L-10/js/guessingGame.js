function guessingGame(){
    if( confirm("Чи бажаєте почати гру") ){
        let [prize, number_range, attempt_1_prize, attempt_2_prize, attempt_3_prize, new_game] =
            [0, 5, 10, 5, 2, true];

        while(new_game){
            new_game = runGame(prize, number_range, attempt_1_prize, attempt_2_prize, attempt_3_prize);
        }

    } else{
        console.log("Сьогодні ви не виграли мільйон, а могли");
    }

    /////////////////////////

    function runGame(prize, range, at1_prize, at2_prize, at3_prize){
        for(let attempt = 0; attempt < 3; attempt++){
            if(userNumber(range) === getRandomNumber(range)){
                prize += prizeCounting(attempt, at1_prize, at2_prize, at3_prize);
                if(userWantsContinue()){
                    nextRound();
                } else{
                    console.log(`Дякуємо за гру, ваш виграш становить ${prize}$`);
                    return;
                }
            }
        }

        console.log("Ваш виграш - 0$");
        return userWantsPlayAgain();

        //////////////////////////

        function nextRound(){
            range *= 2;
            at1_prize *= 3;
            at2_prize *= 3;
            at3_prize *= 3;

            attempt = -1;
        }
    }

    function userNumber(number_range){
        return Number(prompt(`введіть число від 0-${number_range}`));
    }

    function userWantsContinue(){
        return confirm("Чи хоче користувач продовжити гру ?");
    }

    function userWantsPlayAgain(){
        return confirm("Чи хоче користувач зіграти ще раз ?");
    }

    function getRandomNumber(range){
        return Math.round(Math.random() * range);
    }

    function prizeCounting(attemp, at1_prize, at2_prize, at3_prize){
        return arguments[attemp+1];
    }
}
