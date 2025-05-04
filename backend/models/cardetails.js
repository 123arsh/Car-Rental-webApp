const { model, Schema } = require('mongoose');
const carsDataSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    typeofCar: {
        type: String,
        require: true,
    },
    engineType: {
        type: String,
        require: true,
    },
    capacityOfCar: {
        type: Number,
        require: true,
    },
    colorOfCar: {
        type: String,
        require: true,
    }
}, { timestamps: true })

const data = model('data', carsDataSchema);
module.exports = data;