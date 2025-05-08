const { model, Schema } = require('mongoose');
const carsDataSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    typeofCar: {
        type: String,
        required: true,
        index: true,
    },
    engineType: {
        type: String,
        required: true,
        index: true,
    },
    colorOfCar: {
        type: String,
        required: true,
        index: true,
    },
    carImage: {
        type: String,
        required: true,
        index: true,
    },
    availability: {
        type: Boolean,
        default: true,
        index: true,
    },
}, { timestamps: true })

const data = model('data', carsDataSchema);
module.exports = data;