/* Contains all models for incorrect.js */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    connection = mongoose.createConnection('mongodb://localhost:27017/clerkie_challenge');

module.exports.mongoose = mongoose;

let userSchema = new Schema({
    active: { type: Boolean, default: true },
    paid: Boolean,
    signup_date: Date,

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
module.exports.user = connection.model('User', userSchema);

let paymentSchema = new Schema({
    name: String,
    active: { type: Boolean, default: true },
    amount: Number,
    date: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
module.exports.payment = connection.model('Payment', paymentSchema);

let recurringPaymentSchema = new Schema({
    active: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    frequency: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});

module.exports.recurringPayment = connection.model('RecurringPayment', recurringPaymentSchema);
