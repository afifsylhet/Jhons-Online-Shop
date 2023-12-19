const catchAsyncErrors = require("../middleware/catchAsyncError")

const stripe = require('stripe')(process.env.STRIPE_SECRT_KEY);

// Process stripe payments   
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' }

    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})