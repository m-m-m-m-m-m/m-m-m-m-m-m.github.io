getJSON = (function () {
    return function (url) {
        let proxy = 'https://cors-anywhere.herokuapp.com/';
        return fetch(proxy + url)
            .then(function (response) {
                return response.json();
            })
    }
})();


//task 1
(function () {
    var getAstros = getJSON('http://api.open-notify.org/astros.json');
    console.log(typeof getAstros);
    getAstros
        .then(function (data) {
            console.log(data.message);
        }, function (error) {
            console.log(err);
        });
})();

//task2
(function () {
    function MarsWeather() {
        let apiUrl = 'marsweather.ingenology.com/v1/',
            weatherArchive = [],
            latestWeater,
            nextUrl = 'archive/?format=json',
            showLoader = false;

        return {
            init: initMarsWeater,
            loadMore: loadMore
        };

        function initMarsWeater() {
            getLatest();
            addListeners();
        }

        function addListeners() {
            window.addEventListener("hashchange", function () {
                let weather = weatherArchive.find(function (weather) {
                    return location.hash.slice(1) === weather.date
                });
                weather && updateDOM(weather);
            }, false);

            document.getElementById('load-more').addEventListener("click", loadMore);
        }

       
        function getLatest() {
            loader(true);
            getJSON(apiUrl + 'latest/?format=json')
                .then(function (latest) {
                    latestWeater = new WeatherData(latest.report);
                    updateDOM(latestWeater);
                    loader(false);
                })
                .catch(function (err) {
                    console.log(err);
                    displayError("Fail to load latest Weater");
                    loader(false);
                });
        }
        
        function loadMore() {
            if (!nextUrl) return;
            loader(true);
            getJSON(apiUrl + nextUrl)
                .then(function (archive) {
                    nextUrl = archive.next && archive.next.split('/v1/')[1];
                    let newData = [];
                    archive.results && archive.results.length && archive.results.forEach(function (whether) {
                        addToWeatherList(newData, whether);
                    });
                    updateArchiveDOM(newData);
                    weatherArchive = weatherArchive.concat(newData);
                    loader(false);
                })
                .catch(function (err) {
                    console.log(err);
                    displayError("Fail to load more data");
                    loader(false);
                });
        }

        function updateDOM(currentWheater) {
            let mainView = document.getElementById('weather-main');
            mainView.innerHTML = `FOR: ${currentWheater.date}<br>
            temperature:    ${currentWheater.data.temperature}<br>
            wind power:     ${currentWheater.data.wind_power}<br>
            wind direction:     ${currentWheater.data.wind_direction}<br>`
        }

        function updateArchiveDOM(archive) {
            let archiveList = document.getElementById('weather-archive');
            archive && archive.forEach(function (weather) {
                let li = document.createElement('LI');
                li.innerHTML = `<a href="#${weather.date}">${weather.date}</a>`;
                archiveList.appendChild(li);
            });
        }

        function WeatherData(weather) {
            return {
                date: weather.terrestrial_date,
                data: {
                    temperature: (weather.max_temp && weather.min_temp && (weather.max_temp + weather.max_temp) / 2) || 'No temperature',
                    wind_power: weather.wind_speed && weather.wind_speed || 'No wind power',
                    wind_direction: weather.wind_direction || 'No wind direction'
                }
            }
        }

        function loader(state) {
            if (showLoader === state) return;
            showLoader = state;
            showLoader
                ? document.getElementById('circleG').classList.add('animated')
                : document.getElementById('circleG').classList.remove('animated');
        }

        function displayError(message) {
            let error = document.getElementById('error');
            error.innerHTML = `<div class="alert alert-danger">${message}</div>`;
        }
        
        function addToWeatherList(arr, data) {
            arr.push(new WeatherData(data));
        }
    }

    var marsWeather = new MarsWeather();
    marsWeather.init();

})();

