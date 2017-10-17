const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// middleware to get to a folder

// using middleware to accept request, respond and continue to next step.
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write to server.log');
        }
    });

    next();
});

// no next so np other methods called and no other urls called.
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // content type = html
    //res.send('<h1>Hellow Express!</h1>');
    // content type - json
    // res.send({
    //     name: 'Sri Shetty',
    //     likes: [
    //         'Cricket',
    //         'Running'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to express template engine sample'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});


app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Page',
        projectMessage: 'Welcome Sri, this is your portfolio'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfill this request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});