(function(){


    makeFetch();


function makeFetch(){
    return fetch('https://cors-anywhere.herokuapp.com/marsweather.ingenology.com/v1/latest/', {mode: 'cors'})
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            console.log('Request successful', text);
        })
        .catch(function(error) {
            console.log('Request failed', error);
        });
}

})();