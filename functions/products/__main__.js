const { products } = require('../../src/orders')
const setup = require('../../src/setup')

/**
 * @returns {object}
 */
module.exports = async () => {
  const productList = await products.list()

  // Check if products exist on Stripe Account.
  if (products.exist(productList)) {
    return productList
  }

  // We need to set up the products.
  await setup.run()
  return products.list()
}
