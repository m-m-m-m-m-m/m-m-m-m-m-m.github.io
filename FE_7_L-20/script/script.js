let MosaikGame = (function() {
        let gameOptions = {
                figureWidth: 78,
                figureHeight: 78,
                w: 80,
                h: 80,
                animationDuration: 300
            },
            figures,
            gameMatrix,
            timer = new Timer('.time'),
            moveCounter = new Counter('.steps'),
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
            initField(getFigures());
        }

        function newGame() {
            resetGame();
            initField(randomFigures(figures));
            listeners.on();
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
            timer.stop();
            initField(getFigures());
            winningMessage();
        }

        function winningMessage() {
            let message = `You Win, time: ${timer.getTime()}, steps: ${moveCounter.getCount()}`;
            console.log(message);
            alert(message);
        }

        function userWin() {
            for (let i = 0, results = 1; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (results != 16 && gameMatrix[i][j] != results++) return false;
                }
            }
            return true;
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
            $figure
                .data('position', newPosition)
                .queue(function () {
                    listeners.off();
                    moveCounter.count();
                    changePosition(position, newPosition);
                    $(this).data('position', newPosition).addClass('animation').dequeue();
                })
                .animate({
                    'top': `${newPosition.x * gameOptions.w}px`,
                    'left': `${newPosition.y * gameOptions.h}px`
                }, gameOptions.animationDuration, "linear")
                .queue(function () {
                    userWin() && win();
                    listeners.on();
                    $(this).removeClass('animation').dequeue();
                });
        }

        function changePosition(prevPosition, newPosition) {
            gameMatrix[newPosition.x][newPosition.y] = gameMatrix[prevPosition.x][prevPosition.y];
            gameMatrix[prevPosition.x][prevPosition.y] = null;
        }

        function randomFigures(figures) {
            return figures.sort(function () {
                return 0.5 - Math.random()
            });
        }

        function getFigures() {
            let arr = [], i = 1;
            for (; i < 16; i++) arr[i - 1] = i;
            arr.push(null);
            return arr;
        }

        function initField(figures) {
            let row, col,
                figure = 0,
                $fieldContainer = $('.main-box');

            $fieldContainer.css({
                width: gameOptions.w * 4,
                height: gameOptions.h * 4
            }).empty();

            for (row = 0; row < 4; row++) {
                for (col = 0; col < 4; col++) {
                    let style = {
                        width: `${gameOptions.figureWidth}px`,
                        height: `${gameOptions.figureHeight}px`,
                        top: `${gameOptions.w * row}px`,
                        left: `${gameOptions.h * col}px`
                    };

                    $('<div class="figure-box-background"></div>')
                        .css(style)
                        .appendTo($fieldContainer);

                    if (!figures[figure++])continue;

                    gameMatrix[row][col] = figures[figure - 1];
                    $(`<div>${figures[figure - 1]}</div>`)
                        .css(style)
                        .data("position", {x: row, y: col})
                        .addClass('figure-box')
                        .appendTo($fieldContainer);
                }
            }
        }

        function Listeners() {
            return {
                init: function () {
                    $('[data-btn]').on('click', function () {
                        let $el = $(this);
                        $('[data-btn]').removeClass('active');
                        $el.addClass('active');
                        $el.data('btn') == 'new-game' ? newGame() : win();
                    });
                },
                on: function () {
                    $('.main-box').on('click', '.figure-box', shiftFigure);
                },
                off: function () {
                    $('.main-box').off('click', '.figure-box', shiftFigure);
                },
                destroy: function () {
                    $('[data-btn]').off('click');
                    $('.main-box').off('click');
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
                isStarted: isStarted,
                getTime: getTime
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

            function getTime() {
                return convertToMMSS(seconds);
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
})();

$(function(){
    MosaikGame.init();
});
