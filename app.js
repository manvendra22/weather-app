const address = "Makaraba, Ahmedabad"

// const geoCode = require('./findLatLong');
// const geoWeather = require('./getWeather');

//  USING REQUEST WITH "CALLBACK":

// geoCode.geoCode(address, (error, results) => {
//     if(error) {
//         console.log(error);
//     }
//     else {
//         geoWeather.geoWeather(results.lat, results.lng, (error, results) => {
//             if(error) {
//                 console.log(error);
//             }
//             else {
//                 console.log(results);
//             }
//         })
//     }
// });

// USING REQUEST WITH "PROMISES":

// geoCode.geoCode(address).then((result) => {
//     console.log("1st completed ",result);
//     return geoWeather.geoWeather(result);
// }).then((result) => {
//     console.log("2nd completed ",result);
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

// USING "AXIOS" WITH PROMISES:

const axios = require('axios');

const encodedAddress = encodeURIComponent(address);
const geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

const key = "d558ef05643ead2e767c88382346de2a";

axios.get(geoCodeUrl).then((response) => {

    if(response.data.status === 'OK') {
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        const geoWeatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
        return axios.get(geoWeatherUrl);
    }
    else {
        throw new Error('Unable to fetch data');
    }
}).then((response) => {
    console.log(response.data.currently);
}).catch((error) => {
    console.log(error);
})