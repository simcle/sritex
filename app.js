const express = require('express');
const ModbusRTU = require('modbus-serial');




const app = express()
const client = new ModbusRTU()
const rtb = require('./config')
const modbus = rtb.child('flowMeter')

client.connectRTUBuffered("COM2", { baudRate: 9600 });
client.setID(1);


setInterval(() => {
    let out;
    client.readHoldingRegisters(0, 10, function(err, data) {
        out = data.buffer.readFloatBE(0)
    });

    let val = analogScaling(out)
    console.log('Flow Rate: ' +val)
    modbus.set({
        flow_1: val
    })
}, 500)


function analogScaling (val) {
    let min_ma = 4
    let max_ma = 20
    let min_other = 0
    let max_other = 10000

    let a = (max_other - min_other) / (max_ma - min_ma)
    let b = min_ma
    let x = val
    let y = a * (x-b) + min_other
    return y.toFixed(2)
}


const port = 3000;
app.listen(port, () => {
    console.log('app listen on port' +port)
})