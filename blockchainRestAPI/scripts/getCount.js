const fs = require('fs');
//get rid of this!!! we don't  need to compile every time!
//TODO
const solc = require('solc');

module.exports = (web3, addressList) => {
	var obj = {};

	obj.getCount = () => {
		return new Promise(async (resolve, reject) => {
			var result;

			try {
				//Create ABI. Eventually, have this saved locally rather than
				//compile everytime
				//TODO
				var code = fs.readFileSync('Voting.sol').toString();
				var compiledCode = solc.compile(code);
				var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);

				//grab previously deployed contract to play with
				var VotingContract = web3.eth.contract(abiDefinition);
				var contractInstance = VotingContract.at(addressList[0]);

				//count
				//this is just for basic functionality
				web3.eth.defaultAccount = addressList[0];
				result = contractInstance.totalVotesFor.call('Rama').toLocaleString();
				return resolve({value: result});

			}
			catch(e){
				console.log('Error with getcount transaction\n');
				console.log(e);
				return reject(e);
			}
		});
	}
	return obj;
};