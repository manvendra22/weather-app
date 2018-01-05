const request = require('request');

//  USING REQUEST WITH "CALLBACK":

// let geoCode = function(address, callback) {

//     const encodedAddress = encodeURIComponent(address);

//     request({
//         url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
//         json: true
//     }, (error, response, body) => {
//         if(error){
//             callback(error);
//         }
//         else if(body.status === 'OK') {
//             callback(undefined, {
//                 address: body.results[0].formatted_address,
//                 lat: body.results[0].geometry.location.lat,
//                 lng: body.results[0].geometry.location.lng
//             });
//         }
//         else {
//             callback("Wrong Address");
//         }
//     });
// }

// USING REQUEST WITH "PROMISES":

let geoCode = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(error)
                reject(error);
            else if(body.status === 'OK') {
                let val =  {
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                }
                resolve(val);
            } else {
                reject(error);
            }
        })
    });
};

module.exports.geoCode = geoCode;