module.exports = function (app, web3, addressList) {
	const general = require('../scripts/ethNode')(web3);
	const make = require('../scripts/make')(web3, addressList);
	const vote = require('../scripts/vote')(web3, addressList);
	const getCount = require('../scripts/getCount')(web3, addressList);

	//general info of blockchain
	app.get('/api/', (req, res) => {
		var status = general.getStatus();
		res.send({
			data: status
		})
	});

	//compiles and deploys contract on blockchain
	//returns address of new contract
	app.post('/api/contract/create', (req, res) => {
		make.createContract(req.body.itemID, req.body.responses)
			.then(result => {
				res.send({
					data: result
				});
			})
			.catch(error => {});
	});

	//gets list of deployed contracts
	app.get('/api/contract/addresses', (req, res) => {
		res.send({ contractAddresses: addressList})
	});

	//vote on first contract. True if successful. False if not
	app.get('/api/contract/vote', (req, res) => {
		vote.vote().then(result => {
			res.send({
				data: result
			});
		})
			.catch(error => {});
	});

	//get vote count
	app.get('/api/contract/voteCount', (req, res) => {
		getCount.getCount().then(result => {
			res.send({
				data: result
			});
		})
			.catch(error => {});
	});

};