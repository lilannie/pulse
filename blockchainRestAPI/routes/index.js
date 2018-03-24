const nodeRoutes = require('./node_routes')

module.exports = function (app, web3, contractAddressList, userCount, userHistory) {
  // Ether node routes
  nodeRoutes(app, web3, contractAddressList, userCount, userHistory)
}