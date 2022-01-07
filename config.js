const fs = require('fs');

module.exports = {

    mqtt: {
        host: '11.11.11.11',
        port: 1883,
        user: '',
        password: ''
    },

    http: {
        port: 6666
    },

    clients: [
        {
            id: '1',
            name: 'Yandex',
            clientId: 'MyAlisaAppClientId',
            clientSecret: 'my-secret-string',
            isTrusted: true
        },
    ],

    users: [{
        id: '1',
        username: 'admin',
        password: 'admin-secret-password',
        name: 'Administrator'
    },
    {
        id: '2',
        username: 'root',
        password: 'root-secret-password',
        name: 'Administrator'
    },
    ],

    devices: require('./config-devices'),
}

if (fs.existsSync(__dirname + '/config-local.js'))
{
    const conf = require('./config-local')
    Object.assign(module.exports, conf)
}
