const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const { payment: Payment, user: User, recurringPayment: RecurringPayment } = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user', (req, res) => {
    let { paid, signup_date } = req.body;
    let user = new User({ paid, signup_date });
    let user_id = user.id;
    user.save();
    res.send(user_id);
});
app.post('/payment', (req, res) => {
    let { name, user, amount, date } = req.body;
    let payment = new Payment({ name, user, amount, date });
    let payment_id = payment.id;
    payment.save();
    res.send(payment_id);
});

app.post('/recurring-payment', (req, res) => {
    let { active, user, amount, frequency } = req.body;
    let recurringPayment = new RecurringPayment({ active, user, amount, frequency });
    let recurringPayment_id = recurringPayment.id;
    recurringPayment.save();
    res.send(recurringPayment_id);
});

const frequencies = {
    daily: (date) => new Date(date.setDate(date.getDate() + 1)),
    weekly: (date) => new Date(date.setDate(date.getDate() + 7)),
    bi_weekly: (date) => new Date(date.setDate(date.getDate() + 14)),
    monthly: (date) => new Date(date.setDate(date.getDate() + 30)),
};

app.get('/process', async (req, res) => {
    let recurringPayment = await RecurringPayment.find({});
    let now = new Date();
    let thrityDays = now.setMonth(now.getMonth() + 1);
    let payments = [];
    let paymentsIDs = [];
    recurringPayment.forEach((paymentCycle) => {
        let date = new Date();
        while (date < thrityDays) {
            date = frequencies[paymentCycle.frequency](date);
            payments.push(
                new Payment({
                    name: `user_payment:${paymentCycle.user}-${date}`,
                    active: true,
                    amount: paymentCycle.amount,
                    user: paymentCycle.user,
                    date: date,
                }),
            );
            paymentsIDs.push(payments[payments.length - 1].id);
        }
    });
    Payment.insertMany(payments);
    res.send(paymentsIDs);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
