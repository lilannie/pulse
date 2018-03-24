module.exports = function (web3) {
	var obj = {};

	console.log(Object.keys(web3));

	obj.getStatus = () => {
		var result = {};

		//result.connected = web3.isConnected();

		//if (web3.isConnected()) {
			//general node information
			console.log(web3.eth.coinbase);
			result.coinbase = web3.eth.coinbase;
			result.coinbaseBalance = web3.eth.getBalance(result.coinbase).toNumber();
		//}
		return result;
	};
	return obj;
};