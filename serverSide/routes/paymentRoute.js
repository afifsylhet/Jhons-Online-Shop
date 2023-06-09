const express = require('express');
const router = express.Router();

const {
    processPayment,
    sendStripApi
} = require('../controllers/paymentController.js');

const { isAuthenticatedUser } = require('../middleware/auth.js')

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;