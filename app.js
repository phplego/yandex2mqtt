'use strict';

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
const config = require('./config');
const mqtt = require('mqtt');
const device = require('./device');
const fs = require('fs');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);


const client = mqtt.connect(`mqtt://${config.mqtt.host}`, {
    port: config.mqtt.port,
    username: config.mqtt.user,
    password: config.mqtt.password
});

global.devices = {};

if (config.devices) {
    config.devices.forEach(opts => {
        new device(opts, client);
    });
}


app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('views'));
app.use(cookieParser());
app.use(bodyParser.json({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(errorHandler());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./auth');
app.get('/', routes.site.index);
app.get('/login', routes.site.loginForm);
app.post('/login', routes.site.login);
app.get('/logout', routes.site.logout);
app.get('/account', routes.site.account);
app.get('/dialog/authorize', routes.oauth2.authorization);
app.post('/dialog/authorize/decision', routes.oauth2.decision);
app.post('/oauth/token', routes.oauth2.token);
app.get('/api/userinfo', routes.user.info);
app.get('/api/clientinfo', routes.client.info);
app.get('/provider/v1.0', routes.user.ping);
app.get('/provider', routes.user.ping);
app.get('/provider/v1.0/user/devices', routes.user.devices);
app.post('/provider/v1.0/user/devices/query', routes.user.query);
app.post('/provider/v1.0/user/devices/action', routes.user.action);
app.post('/provider/v1.0/user/unlink', routes.user.unlink);
httpServer.listen(config.http.port);


function updateDeviceState(device, message)
{
    for(const mqttConfig of device.data.custom_data.mqtt){

        let receivedValue = null;
        if('jsonKey' in mqttConfig.stat){
            receivedValue = JSON.parse(message)[mqttConfig.stat.jsonKey];
        }
        else{
            receivedValue = message.toString();
        }
        console.log(`updateDeviceState() ${device.data.id} type=${mqttConfig.type} receivedValue=${receivedValue}`);

        switch(mqttConfig.type){
            case 'on':{
                const capability =  device.data.capabilities.find(c => c.type = 'devices.capabilities.on_off');
                capability.state.instance = mqttConfig.type;
                capability.state.value = ['on', '1', 'true'].includes(receivedValue.toString().toLowerCase());
                break;
            }
            case 'temperature':{
                const capability = device.data.capabilities.find(x => x.type === 'devices.capabilities.range');
                if(capability){
                    capability.state.instance = mqttConfig.type;
                    capability.state.value = receivedValue;
                }

                const property = device.data.properties.find(x => x.parameters.instance === 'temperature');
                if(property){
                    property.state.instance = mqttConfig.type;
                    property.state.value = receivedValue;
                    console.log('temperature property value set to', receivedValue);
                }
                break;
            }
            case 'humidity':{
                const capability = device.data.capabilities.find(x => x.type === 'devices.capabilities.range');
                if(capability){
                    capability.state.instance = mqttConfig.type;
                    capability.state.value = receivedValue;
                }

                const property = device.data.properties.find(x => x.parameters.instance === 'humidity');
                if(property){
                    property.state.instance = mqttConfig.type;
                    property.state.value = receivedValue;
                    console.log('humidity property value set to', receivedValue);
                }
                break;
            }
            case 'co2_level':{
                const property = device.data.properties.find(x => x.parameters.instance === 'co2_level');
                if(property){
                    property.state.instance = mqttConfig.type;
                    property.state.value = receivedValue;
                    console.log('co2_level property value set to', receivedValue);
                }
                break;
            }
        }
    }
}

client.on('connect', () => {
    const allTopics = Object.values(global.devices).map(device => device.data.custom_data.mqtt).flat().map(mqttConfig => mqttConfig.stat.topic);
    console.log('allTopics', allTopics)
    client.subscribe(allTopics);
    client.on('message', (topic, message) => {
        console.log('<< got mqtt', topic, message.toString());
        const matchedDevices = Object.values(global.devices).filter(
            d => d.data.custom_data.mqtt.find(mqttConfig => mqttConfig.stat.topic === topic)
        );
        for(const device of matchedDevices){
            updateDeviceState(device, message);
        }
    });
});

client.on('offline', () => {
    console.log('mqtt server goes offline')
});

module.exports = app;
