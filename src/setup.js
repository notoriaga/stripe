/**
 * setup.js
 * Stripe Payments Demo. Created by Romain Huet (@romainhuet).
 *
 * This is a one-time setup script for your server. It creates a set of fixtures,
 * namely products and SKUs, that can then used to create orders when completing the
 * checkout flow in the web interface.
 */

const config = require('../config')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = {
  running: false,
  run: async () => {
    if (this.running) {
      console.log('⚠️  Setup already in progress.')
    } else {
      this.running = true
      this.promise = new Promise(async resolve => {
        // Create a few products and SKUs assuming they don't already exist.
        try {
          // Increment Magazine.
          await stripe.products.create({
            id: 'increment',
            name: 'Increment Magazine',
            attributes: ['issue']
          })
          await stripe.skus.create({
            id: 'increment-03',
            product: 'increment',
            attributes: { issue: 'Issue #3 “Development”' },
            price: 399,
            currency: config.currency,
            inventory: { type: 'infinite' }
          })

          // Stripe Shirt.
          await stripe.products.create({
            id: 'shirt',
            name: 'Stripe Shirt',
            attributes: ['size', 'gender']
          })
          await stripe.skus.create({
            id: 'shirt-small-woman',
            product: 'shirt',
            attributes: { size: 'Small Standard', gender: 'Woman' },
            price: 999,
            currency: config.currency,
            inventory: { type: 'infinite' }
          })

          // Stripe Pins.
          await stripe.products.create({
            id: 'pins',
            name: 'Stripe Pins',
            attributes: ['set']
          })
          await stripe.skus.create({
            id: 'pins-collector',
            product: 'pins',
            attributes: { set: 'Collector Set' },
            price: 499,
            currency: config.currency,
            inventory: { type: 'finite', quantity: 500 }
          })
          console.log('Setup complete.')
          resolve()
          this.running = false
        } catch (err) {
          if (err.message === 'Product already exists.') {
            console.log('⚠️  Products have already been registered.')
            console.log('Delete them from your Dashboard to run this setup.')
          } else {
            console.log('⚠️  An error occurred.', err)
          }
        }
      })
    }
    return this.promise
  }
}
