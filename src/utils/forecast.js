const request = require('postman-request')

const forecast = (lon, lat, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=cef90d8f6a05516727e1f793e37e5fac&query=${lat},${lon}&units=m`
    
    request({url, json:true}, (error, {body}) => {
    
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        } else if (body.error) {
            callback('Unable to find that location', undefined)
        } else {
            const{temperature, weather_descriptions:description, feelslike, precip} = body.current
            // console.log(response.body.current)
            callback(undefined, 
                `${description}. I is currently ${temperature} degrees out. There is a ${precip}% chance of rain.`
            )
        }
    })
}

module.exports = forecast


