class device {
  constructor(options, mqttClient) {
    this.client = mqttClient;
    //var id = 'id' + global.devices.length;
    var id = options.name + ' - ' + options.room;
    this.data = {
      id: String(id),
      name: options.name || 'Без названия',
      description: options.description || '',
      room: options.room || '',
      type: options.type || 'devices.types.light',
      custom_data: {
        mqtt: options.mqtt || [{}]
      },
      capabilities: options.capabilities,
      properties: options.properties || [],
    }
    //global.devices.push(this);
    global.devices[id] = this;
  }

  getInfo() {
    return this.data;
  };


  findIndex(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].type === elem) {
        return i;
      }
    }
    return false;
  };



  setState(val, type, inst) {
    var payload;
    var topic;

    console.log('device.setState() inst =', inst);
    console.log('this.data.custom_data.mqtt', this.data.custom_data.mqtt);

    payload = this.data.custom_data.mqtt[this.findIndex(this.data.custom_data.mqtt, inst)].set.payload;
    const state_var = this.data.custom_data.mqtt[this.findIndex(this.data.custom_data.mqtt, inst)].set.state_var;
    this.data.capabilities[this.findIndex(this.data.capabilities, type)].state.instance = inst;
    this.data.capabilities[this.findIndex(this.data.capabilities, type)].state.value = val;
    topic = this.data.custom_data.mqtt[this.findIndex(this.data.custom_data.mqtt, inst)].set.topic || false;

    try {
      switch (inst) {
        // case 'mute':{
        //   break;
        // }
        // case 'temperature':{
        //   break;
        // }
        case 'on':{
          payload[state_var] = val ? 'on' : 'off';
          break;
        }
        default:{
          payload[state_var] = val;
        }
      }
    }
    catch (err) {
      topic = false;
      console.log(err);
    }


    if (topic) {
      console.log(`>> sending mqtt message. ${topic} ${JSON.stringify(payload)}`);

      if (typeof payload === 'string')
        this.client.publish(topic, payload);
      else
        this.client.publish(topic, JSON.stringify(payload));
    }
    return [
      {
        'type': type,
        'state': {
          'instance': inst,
          'action_result': {
            'status': 'DONE'
          }
        }
      }
    ];
  };
}
module.exports = device;
