module.exports = function (app, web3, contractAddressList, userCount, userHistory) {
	const general = require('../scripts/ethNode')(web3);
	const make = require('../scripts/make')(web3, contractAddressList);
	const vote = require('../scripts/vote')(web3, contractAddressList, userHistory);
	const getCount = require('../scripts/getCount')(web3, contractAddressList);
	const history = require('../scripts/getVoterHistory')(web3, contractAddressList);

	//general info of blockchain
	app.get('/', (req, res) => {
		var status = general.getStatus();
		res.send({
			data: status
		})
	});

	//compiles and deploys contract on blockchain
	//returns address of new contract
	app.post('/contract/create', (req, res) => {
		make.createContract(req.body.itemID, req.body.responses)
  		.then(result => {
  			res.send({ 
  				data: result
  			});
  		})
  		.catch(error => {});
	});

	//vote on specified contract. True if successful. False if not
	app.post('/contract/vote', (req, res) => {
		vote.vote(req.body.contractAddress, req.body.voterAddress, req.body.response)
		.then(result => {
			res.send({
				data: result
			});
		})
		.catch(error => {});
	});

	app.get('/create/user', (req, res) => {
		userAddress = web3.eth.accounts[userCount];
		userCount++;
		record = {};
		record.voterAddress = userAddress;
		record.contracts = [];
		record.responses = [];
		userHistory.push(record);

		res.send({
			newUserAddress: userAddress
		})
	});

	//returns two arrays. one of addresses and one of coorelated responses
	app.get('/contract/history/:contractAddress', (req, res) => {
		address = req.params.contractAddress;
		history.getVoterHistory(address)
		.then(result => {
			res.send({
				data: result
			});
		})
		.catch(error => {
			res.send(error);
		});
	});

	app.get('/users/count', (req, res) => {
		res.send({
			BCRegisteredVoters: (userCount - 1)
		})
	});

	app.get('/user/history/:address', (req, res) => {
		//gets index of user history
		index = 0;
		for (i = 0; i < userHistory.length; i++) {
			if (req.params.address == userHistory[i].voterAddress) {
				index = i;
			}
		}
		res.send({
			History: (userHistory[index])

		})
	});

	//gets list of deployed contracts
	app.get('/contract/addresses', (req, res) => {
		res.send({ contractAddresses: contractAddressList})
	});

	//get vote count
	app.get('/contract/voteCount', (req, res) => {
		getCount.getCount().then(result => {
			res.send({
				data: result
			});
		})
		.catch(error => {});
	});

};