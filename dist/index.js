
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./use-react-factory.cjs.production.min.js')
} else {
  module.exports = require('./use-react-factory.cjs.development.js')
}
