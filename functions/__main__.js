const path = require('path')
const { promisify } = require('util')

const renderFile = promisify(require('ejs').renderFile)
const templatePath = path.join(__dirname, '/../public/index.html')

let app

/**
 * Renders your Index page from ./public/index.ejs
 * @returns {object.http}
 */
module.exports = async (context) => {
  let path = '/' + context.service.identifier
              .replace('.', '/')
              .substr(0, context.service.identifier.indexOf('['))

  app = app || await renderFile(templatePath, { path: path })

  return {
    headers: {
      'content-type': 'text/html'
    },
    body: Buffer.from(app),
    statusCode: 200
  }
}
