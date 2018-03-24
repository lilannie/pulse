// sets up blockchain interaction
const nodePort = 8545;

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:" + nodePort));

const address_list = [];

const general = require('./scripts/ethNode')(web3);
const make = require('./scripts/make')(web3, addressList);
const vote = require('./scripts/vote')(web3, addressList);
const getCount = require('./scripts/getCount')(web3, addressList);

module.exports = {
	getInfo: () => {
		var status = general.getStatus();
		return {
			data: status
		};
	},
	contractCreate: (itemId, responses) => {
		return new Promise((resolve, reject) => {

			make.createContract(itemID, responses)

				.then(result => {
					resolve({
						data: result
					});
				})

				.catch(error => {
					reject(error);
				});
		};
	}
};