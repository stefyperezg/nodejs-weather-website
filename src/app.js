const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to save
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Stefanny Perez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Stefanny Perez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        helpText: 'Frequently Asked Questions',
        name: 'Stefanny Perez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast (longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                console.log(location)
                console.log(forecastData)
                res.send({
                    location: location,
                    forecast: forecastData
                })
            })
        })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Stefanny Perez'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Stefanny Perez'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


//nodemon src/app.js -e js,hbs