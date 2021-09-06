const request = require('postman-request')

const geocode = (address, callback) => {
    
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3RlZnlwZXJlemciLCJhIjoiY2tzeGx2Nnl0MGd6bTJxcWlrcHF4cWN3byJ9.1Uj6anLaC8P814OTHCtIfQ&limit=1`
    
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode