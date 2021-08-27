const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const {host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    service: 'gmail',
    host,
    secure: true,
    port,
    auth: {user, pass},
});

transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/')
      },
    viewPath: path.resolve('./resources/mail'),
    extName: '.html',
}));

module.exports = transport;
