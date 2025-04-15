const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const DatabaseService = require('./config/db.js')

const clientRoutes = require('./routes/clientRoutes.js');
const interestRateRoutes = require('./routes/interestRateRoutes.js');
const loanRoutes = require('./routes/loanRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const paymentPeriodRoutes = require('./routes/paymentPeriodRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
DatabaseService.connect();


app.use('/api/clients', clientRoutes);
app.use('/api/interest-rates', interestRateRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/payment-periods', paymentPeriodRoutes);
app.use('/api/users', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});