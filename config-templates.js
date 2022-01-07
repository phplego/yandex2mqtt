module.exports = {
    tplSimpleSwitch(name, room, state_var, topic_stat, topic_set){
        return {
            name: name,
            room: room,
            type: 'devices.types.light',
            mqtt: [
                {
                    type: 'on',
                    set: { topic: topic_set, state_var: state_var, payload: { } },
                    stat: { topic: topic_stat, jsonKey: state_var },
                },
            ],
            capabilities: [
                {
                    type: 'devices.capabilities.on_off',
                    retrievable: true,
                    state: {
                        instance: 'on',
                        value: false
                    }
                },
            ]
        };
    },

    tplAqaraTemperatureSensor(name, room, topic){
        return {
            name: name,
            room: room,
            type: 'devices.types.sensor',
            mqtt: [
                {
                    type: 'temperature',
                    stat: { topic: topic, jsonKey: 'temperature' },
                },
                {
                    type: 'humidity',
                    stat: { topic: topic, jsonKey: 'humidity' },
                },
            ],
            capabilities: [],
            properties: [{
                "type": "devices.properties.float",
                "retrievable": true,
                "parameters": {
                    "instance": "temperature",
                    "unit": "unit.temperature.celsius"
                },
                state: {
                    instance: "temperature",
                    value: 0,
                }
            },
            {
                "type": "devices.properties.float",
                "retrievable": true,
                "parameters": {
                    "instance": "humidity",
                    "unit": "unit.percent"
                },
                state: {
                    instance: "humidity",
                    value: 0,
                }
            }]
        };
    }
}