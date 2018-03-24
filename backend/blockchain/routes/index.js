const nodeRoutes = require('./node_routes')

module.exports = function (app, web3, addressList) {
  // Ether node routes
  nodeRoutes(app, web3, addressList)
}