const { orders } = require('../../src/orders')

/**
 * Creates an order
 * @param {string} currency
 * @param {array} items
 * @param {string} email
 * @param {object} shipping
 * @returns {object}
 */
module.exports = async (currency, items, email, shipping, context) => {
  let order

  try {
    order = await orders.create(currency, items, email, shipping)
  } catch (error) {
    return { error: error.message }
  }

  return order
}
