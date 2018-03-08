const config = require('../config')

/**
 * @returns {object}
 */
module.exports = async () => {
  return {
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeCountry: config.stripe.country,
    country: config.country,
    currency: config.currency
  }
}
