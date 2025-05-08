const { model, Schema } = require('mongoose');
const Information = new Schema({
    adharCard: {
        type: String,
        require: true,
    },
    drivingLicence: {
        type: String,
        reuire: true,
    },
    startDate: {
        type: Date,
        require: true,
    },
    endDate: {
        type: Date,
        require: true,
    }
}, {timestamps: true} )
const customerInfo = model('customerInfo', Information);
module.exports = customerInfo;