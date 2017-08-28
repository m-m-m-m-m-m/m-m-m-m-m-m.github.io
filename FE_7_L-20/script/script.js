function MozaikGame() {

    let gameOptions = {
            figureWidth: 98,
            figureHeight: 98
        },
        figures,
        gameMatrix,
        timer = new Timer('.timer'),
        moveCounter = new Counter('.counter'),
        listeners = new Listeners();

    return {
        init: initGame,
        newGame: newGame,
        win: win
    };

    ////////////////////////////////////////////////////////

    function initGame() {
        listeners.init();
        resetGame();
        win();
    }

    function newGame() {
        resetGame();
        listeners.on();
        initField(randomFigures(figures));
        timer.start();
    }

    function resetGame() {
        listeners.off();
        figures = getFigures();
        gameMatrix = [[], [], [], []];
        timer.stop().clear();
        moveCounter.clear();
    }

    function win() {
        figures = getFigures();
        timer.stop();
        initField(figures);
    }

    function randomFigures(figures) {
        return figures.sort(function () {
            return 0.5 - Math.random()
        });
    }

    function Listeners() {
        return {
            init: function () {
                $("[data-btn='new-game']").on('click', newGame);
                $("[data-btn='win']").on('click', win);
            },
            on: function () {
                console.log('listeners on');
                $('.main-box').on('click', '.figure-box', shiftFigure);
            },
            off: function () {
                console.log('listeners off');
                $('.main-box').off('click', '.figure-box', shiftFigure);
            },
            destroy: function () {
                $('[data-btn]').off('click');
                $('.main-box').off('click');
            }
        }
    }


    function canBeShifted(position) {
        let {x, y} = position;

        return (x + 1 < 4 && !gameMatrix[x + 1][y] && {x: x + 1, y: y} ) ||
            (x - 1 > -1 && !gameMatrix[x - 1][y] && {x: x - 1, y: y}) ||
            (y + 1 < 4 && !gameMatrix[x][y + 1] && {x: x, y: y + 1}) ||
            (y - 1 > -1 && !gameMatrix[x][y - 1] && {x: x, y: y - 1});
    }

    function shiftFigure(event) {

        let $figure = $(this), position, newPosition;
        position = $figure.data('position');
        newPosition = canBeShifted(position);

        if (!newPosition) return;

        moveCounter.count();

        $figure
            .data('position', newPosition)
            .queue(function () {
                changePosition(position, newPosition);
                $(this)
                    .data('position', newPosition)
                    .addClass('animation').dequeue();
            })
            .animate({
                'top': `${newPosition.x * 100}px`,
                'left': `${newPosition.y * 100}px`
            }, 300, "linear")
            .queue(function () {
                $(this).removeClass('animation').dequeue();
            });
    }

    function changePosition(prevPosition, newPosition) {
        gameMatrix[newPosition.x][newPosition.y] = gameMatrix[prevPosition.x][prevPosition.y];
        gameMatrix[prevPosition.x][prevPosition.y] = null;
    }

    function getFigures() {
        let arr = [], i = 1;
        for (; i < 16; i++) arr[i - 1] = i;
        arr.push(null);
        return arr;
    }

    function initField(figures) {
        let row, col, figure = 0, $fieldContainer = $('.main-box');

        $fieldContainer.css({
            width: 100 * 4,
            height: 100 * 4
        });

        $fieldContainer.empty();

        for (row = 0; row < 4; row++) {
            for (col = 0; col < 4; col++) {
                if (!figures[figure++]) continue;
                gameMatrix[row][col] = figures[figure - 1];
                $(`<div>${figures[figure - 1]}</div>`)
                    .css({
                        width: `${gameOptions.figureWidth}px`,
                        height: `${gameOptions.figureHeight}px`,
                        top: `${100 * row}px`,
                        left: `${100 * col}px`
                    })
                    .data("position", {x: row, y: col})
                    .addClass('figure-box')
                    .appendTo($fieldContainer)
            }
        }
    }


    function Timer(selector) {
        let timer,
            seconds = 0,
            $timeContainer = $(selector);

        clearTimer();

        return {
            start: startTimer,
            clear: clearTimer,
            stop: stopTimer,
            isStarted: isStarted
        };

        function isStarted() {
            return timer > -1;
        }

        function clearTimer() {
            seconds = 0;
            updateDOMTimer();
            return this;
        }

        function startTimer() {
            isStarted() && stopTimer() && clearTimer();
            timer = setInterval(
                function () {
                    seconds++;
                    updateDOMTimer();
                }, 1000
            );
        }

        function stopTimer() {
            clearTimeout(timer);
            return this;
        }

        function updateDOMTimer() {
            $timeContainer.html(convertToMMSS(seconds));
        }

        function convertToMMSS(seconds) {
            let min = Math.floor(seconds / 60),
                sec = seconds % 60,
                additionalZero = time=>time < 10 ? "0" + time : time;

            return `${additionalZero(min)}:${additionalZero(sec)}`
        }
    }


    function Counter(selector) {
        let counter,
            $counterContainer = $(selector);

        clearCounter();

        return {
            count: count,
            clear: clearCounter,
            getCount: getCount
        };

        function count() {
            counter++;
            updateDOMCounter();
        }

        function getCount() {
            return counter;
        }

        function clearCounter() {
            counter = 0;
            updateDOMCounter();
        }

        function updateDOMCounter() {
            $counterContainer.html(counter);
        }
    }
}


$(function () {
    let game = new MozaikGame();

    game.init();
});