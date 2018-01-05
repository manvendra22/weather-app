const request = require('request');

const key = "d558ef05643ead2e767c88382346de2a"

// USING REQUEST WITH "CALLBACK":

// let geoWeather = function(lat, lng, callback) {
//     request({
//         url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
//         json: true
//     }, (error, response, body) => {
//         if(error){
//             callback(error);
//         }
//         else if(response.statusCode === 400) {
//             callback(error);
//         }
//         else {
//             callback(undefined,body);
//         }

//     } )
// }

// USING REQUEST WITH "PROMISES":

let geoWeather = (result) => {

    let lat = result.lat;
    let lng = result.lng;

    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if(error)
                reject(error);
            else if(response.statusCode === 400)
                reject(error);
            else
                resolve(body);
        });
    });
}

module.exports.geoWeather = geoWeather;