const templates = require("./config-templates.js");

module.exports = [
    {
        name: 'Свет',
        room: 'Вход',
        type: 'devices.types.light',
        mqtt: [
            //  {
            //     type: 'on',
            //     set: '/devices/yandex/controls/light1/on',
            //     stat: '/devices/yandex/controls/light1'
            //  },
            {
                type: 'on',
                set: { topic: 'zigbee2mqtt/enter_key/set', state_var: 'state', payload: { state: 'SOME_VALUE' } },
                stat: { topic: 'zigbee2mqtt/enter_key', jsonKey: 'state' },
            },
            // {
            //     type: 'rgb',
            //     set: '/devices/yandex/controls/light3/on',
            //     stat: '/devices/yandex/controls/light3'
            // },
            // {
            //     type: 'temperature_k',
            //     set: '/devices/yandex/controls/light4/on',
            //     stat: '/devices/yandex/controls/light4'
            // },
            // {
            //     type: 'brightness',
            //     set: '/devices/yandex/controls/light5/on',
            //     stat: '/devices/yandex/controls/light5'
            // },
        ],
        capabilities: [
            {
                type: 'devices.capabilities.on_off',
                retrievable: true,
                state: {
                    instance: 'on',
                    value: true
                }
            },
            // {
            //     type: 'devices.capabilities.range',
            //     retrievable: true,

            //     parameters: {
            //         instance: 'brightness',
            //         unit: 'unit.percent',
            //         range: {
            //             min: 0,
            //             max: 100,
            //             precision: 1
            //         }
            //     },
            //     state: {
            //         instance: 'brightness',
            //         value: 10,
            //     },
            // },
            // {
            //     type: 'devices.capabilities.color_setting',
            //     retrievable: true,
            //     parameters: {
            //         color_model: 'rgb',
            //         temperature_k: {
            //             min: 2000,
            //             max: 8500,
            //             precision: 500,
            //         }
            //     },
            //     state: {
            //         instance: 'rgb',
            //         value: 0
            //     },
            // },
        ]
    },
    {
        name: 'Свет',
        room: 'Кухня',
        type: 'devices.types.light',
        mqtt: [
            {
                type: 'on',
                set: { topic: 'zigbee2mqtt/kitchen_keys/set', state_var: 'state_left', payload: { state_left: '' } },
                stat: { topic: 'zigbee2mqtt/kitchen_keys', jsonKey: 'state_left' },
            },
        ],
        capabilities: [
            {
                type: 'devices.capabilities.on_off',
                retrievable: true,
                state: {
                    instance: 'on',
                    value: true
                }
            },
        ]
    },

    {
        name: 'Свет',
        room: 'Над компьютером',
        type: 'devices.types.light',
        mqtt: [
            {
                type: 'on',
                set: { topic: 'zigbee2mqtt/living_tables_keys/set', state_var: 'state_left', payload: { state_left: '' } },
                stat: { topic: 'zigbee2mqtt/living_tables_keys', jsonKey: 'state_left' },
            },
        ],
        capabilities: [
            {
                type: 'devices.capabilities.on_off',
                retrievable: true,
                state: {
                    instance: 'on',
                    value: true
                }
            },
        ]
    },

    {
        name: 'Свет',
        room: 'Над велосипедом',
        type: 'devices.types.light',
        mqtt: [
            {
                type: 'on',
                set: { topic: 'zigbee2mqtt/living_tables_keys/set', state_var: 'state_right', payload: { state_right: '' } },
                stat: { topic: 'zigbee2mqtt/living_tables_keys', jsonKey: 'state_right' },
            },
        ],
        capabilities: [
            {
                type: 'devices.capabilities.on_off',
                retrievable: true,
                state: {
                    instance: 'on',
                    value: true
                }
            },
        ]
    },


    {
        name: 'Свет',
        room: 'Гардеробная',
        type: 'devices.types.light',
        mqtt: [
            {
                type: 'on',
                set: { topic: 'zigbee2mqtt/closet_keys/set', state_var: 'state_left', payload: { state_left: '' } },
                stat: { topic: 'zigbee2mqtt/closet_keys', jsonKey: 'state_left' },
            },
        ],
        capabilities: [
            {
                type: 'devices.capabilities.on_off',
                retrievable: true,
                state: {
                    instance: 'on',
                    value: true
                }
            },
        ]
    },

    templates.tplAqaraTemperatureSensor("Датчик температуры", "Ванная",  "zigbee2mqtt/temp_hum_sensor"),
    templates.tplAqaraTemperatureSensor("Датчик температуры", "Комната", "zigbee2mqtt/temp_hum_sensor2"),
    templates.tplAqaraTemperatureSensor("Датчик температуры", "Окно",    "zigbee2mqtt/temp_hum_sensor3"),

    {
        name: 'Датчик воздуха',
        room: 'Гардеробная',
        type: 'devices.types.sensor',
        mqtt: [
            {
                type: 'co2_level',
                stat: { topic: 'wifi2mqtt/co2meter', jsonKey: 'co2' },
            },
        ],
        capabilities: [],
        properties: [{
            type: "devices.properties.float",
            retrievable: true,
            parameters: {
                "instance": "co2_level",
                "unit": "unit.ppm"
            },
            state: {
                instance: "co2_level",
                value: 0,
            }
        }]
    },


    {
        name: 'Кондиционер',
        room: 'Комната',
        type: 'devices.types.thermostat.ac',
        mqtt: [
             {
                type: 'on',
                set: { topic: 'mqtt2coolix/electrolux_ac/set', state_var: 'power', payload: {power:''}},
                stat: { topic: 'mqtt2coolix/electrolux_ac', jsonKey: 'power'},
            },
            {
                type: 'temperature',
                set: { topic: 'mqtt2coolix/electrolux_ac/set', state_var: 'temp', payload: {temp:''}},
                stat: { topic: 'mqtt2coolix/electrolux_ac', jsonKey: 'temp'},
            },
            {
                type: 'thermostat',
                set: { topic: 'mqtt2coolix/electrolux_ac/set', state_var: 'mode', payload: {mode:''}},
                stat: { topic: 'mqtt2coolix/electrolux_ac', jsonKey: 'mode'},
            },
            {
                type: 'fan_speed',
                set: { topic: 'mqtt2coolix/electrolux_ac/set', state_var: 'fan', payload: {fan:''}},
                stat: { topic: 'mqtt2coolix/electrolux_ac', jsonKey: 'fan'},
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
            {
                type: 'devices.capabilities.range',
                retrievable: true,

                parameters: {
                    instance: 'temperature',
                    unit: 'unit.temperature.celsius',
                    range: {
                        min: 16,
                        max: 32,
                        precision: 1
                    }
                },
                state: {
                    instance: 'temperature',
                    value: 25,
                },
            },
            {
                type: 'devices.capabilities.mode',
                retrievable: true,
                parameters: {
                    instance: 'thermostat',
                    modes:  [
                        {
                            value: 'heat'
                        },
                        {
                            value: 'cool'
                        },
                        {
                            value: 'auto'
                        },
                        {
                            value: 'eco'
                        },
                        {
                            value: 'dry'
                        },
                        {
                            value: 'fan_only'
                        },
                    ],
                },
                state: {
                    instance: 'thermostat',
                    value: 'fan_only',
                },
            },
            {
                type: 'devices.capabilities.mode',
                retrievable: true,
                parameters: {
                    instance: 'fan_speed',
                    modes:  [
                        {
                            value: 'auto'
                        },
                        {
                            value: 'low'
                        },
                        {
                            value: 'medium'
                        },
                        {
                            value: 'high'
                        },
                    ],
                    ordered: true,
                },
                state: {
                    instance: 'fan_speed',
                    value: 'auto',
                },
            },
        ],
    },        



    // // ________ Второе устройство___________//
    //     {
    //         name: 'Телевизор',
    //         room: 'Комната',
    //         type: 'devices.types.media_device.tv',
    //         mqtt: [
    //              {
    //                 type: 'on',
    //                 set: '/devices/yandex/controls/light6/on',
    //                 stat: '/devices/yandex/controls/light6'
    //             },
    //             {
    //                 type: 'mute',
    //                 set: '/devices/yandex/controls/light2/on',
    //                 stat: '/devices/yandex/controls/light2'
    //             },
    //             {
    //                 type: 'volume',
    //                 set: '/devices/yandex/controls/light7/on',
    //                 stat: '/devices/yandex/controls/light7'
    //             },
    //             {
    //                 type: 'channel',
    //                 set: '/devices/yandex/controls/light8/on',
    //                 stat: '/devices/yandex/controls/light8'
    //             },
    //         ],
    //         capabilities: [
    //             {
    //                 type: 'devices.capabilities.on_off',
    //                 retrievable: true,
    //                 state: {
    //                     instance: 'on',
    //                     value: true
    //                 }
    //             },
    //             {
    //                 type: 'devices.capabilities.toggle',
    //                 retrievable: true,
    //                 parameters: {
    //                     instance: 'mute'
    //                 },
    //                 state: {
    //                     instance: 'mute',
    //                     value: true
    //                 },
    //             },

    //             {
    //                 type: 'devices.capabilities.range',
    //                 retrievable: true,

    //                 parameters: {
    //                     instance: 'channel',
    //                 },
    //                 state: {
    //                     instance: 'channel',
    //                     value: 1,
    //                 },
    //             },
    //             {
    //                 type: 'devices.capabilities.range',
    //                 retrievable: true,

    //                 parameters: {
    //                     instance: 'volume',
    //                     range: {
    //                         min: 0,
    //                         max: 100,
    //                         precision: 1
    //                     }
    //                 },
    //                 state: {
    //                     instance: 'volume',
    //                     value: 10,
    //                 },
    //             },
    //         ]
    //     },
    // //_________конец второго устройства_________//


    // //______Третье устройство____//

    //     {
    //         name: 'Кондиционер',
    //         room: 'Комната',
    //         type: 'devices.types.thermostat.ac',
    //         mqtt: [
    //              {
    //                 type: 'on',
    //                 set: '/devices/yandex/controls/light9/on',
    //                 stat: '/devices/yandex/controls/light9'
    //             },
    //             {
    //                 type: 'temperature',
    //                 set: '/devices/yandex/controls/light10/on',
    //                 stat: '/devices/yandex/controls/light10'
    //             },
    //             {
    //                 type: 'thermostat',
    //                 set: '/devices/yandex/controls/light11/on',
    //                 stat: '/devices/yandex/controls/light11'
    //             },
    //             {
    //                 type: 'fan_speed',
    //                 set: '/devices/yandex/controls/light12/on',
    //                 stat: '/devices/yandex/controls/light12'
    //             },
    //         ],
    //         capabilities: [
    //             {
    //                 type: 'devices.capabilities.on_off',
    //                 retrievable: true,
    //                 state: {
    //                     instance: 'on',
    //                     value: true
    //                 }
    //             },
    //             {
    //                 type: 'devices.capabilities.range',
    //                 retrievable: true,

    //                 parameters: {
    //                     instance: 'temperature',
    //                     unit: 'unit.temperature.celsius',
    //                     range: {
    //                         min: 16,
    //                         max: 40,
    //                         precision: 1
    //                     }
    //                 },
    //                 state: {
    //                     instance: 'temperature',
    //                     value: 25,
    //                 },
    //             },
    //             {
    //                 type: 'devices.capabilities.mode',
    //                 retrievable: true,
    //                 parameters: {
    //                     instance: 'thermostat',
    //                     modes:  [
    //                         {
    //                             value: 'heat'
    //                         },
    //                         {
    //                             value: 'cool'
    //                         },
    //                         {
    //                             value: 'auto'
    //                         },
    //                         {
    //                             value: 'eco'
    //                         },
    //                         {
    //                             value: 'dry'
    //                         },
    //                         {
    //                             value: 'fan_only'
    //                         },
    //                     ],
    //                 },
    //                 state: {
    //                     instance: 'thermostat',
    //                     value: 'fan_only',
    //                 },
    //             },
    //             {
    //                 type: 'devices.capabilities.mode',
    //                 retrievable: true,
    //                 parameters: {
    //                     instance: 'fan_speed',
    //                     modes:  [
    //                         {
    //                             value: 'auto'
    //                         },
    //                         {
    //                             value: 'low'
    //                         },
    //                         {
    //                             value: 'medium'
    //                         },
    //                         {
    //                             value: 'high'
    //                         },
    //                     ],
    //                     ordered: true,
    //                 },
    //                 state: {
    //                     instance: 'fan_speed',
    //                     value: 'auto',
    //                 },
    //             },
    //         ]
    //     },
    // //____конец третьего устройства___//

    // //_______________Устройство с HSV______________//
    //     {
    //         name: 'Лампочка',
    //         room: 'Комната',
    //         type: 'devices.types.light',
    //         mqtt: [
    //              {
    //                 type: 'on',
    //                 set: '/devices/yandex/controls/light13/on',
    //                 stat: '/devices/yandex/controls/light13'
    //             },
    //             {
    //                 type: 'hsv',
    //                 set: '/devices/yandex/controls/light14/on',
    //                 stat: '/devices/yandex/controls/light14'
    //             },

    //         ],
    //         capabilities: [
    //             {
    //                 type: 'devices.capabilities.on_off',
    //                 retrievable: true,
    //                 state: {
    //                     instance: 'on',
    //                     value: true
    //                 }
    //             },
    //             {
    //                 type: 'devices.capabilities.color_setting',
    //                 retrievable: true,
    //                 parameters: {
    //                     color_model: 'hsv',
    //                 },
    //                 state: {
    //                     instance: 'hsv',
    //                     value: {h: 0, s: 0, v: 0}
    //                 },
    //             },
    //         ]
    //     },
    // //__________Конец устройства__________//


]