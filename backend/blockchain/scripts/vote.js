const fs = require('fs');
//get rid of this!!! we don't  need to compile every time!
//TODO
const solc = require('solc');

module.exports = (web3, addressList) => {
	var obj = {};

	obj.vote = () => {
		return new Promise(async (resolve, reject) => {
			var result;

			try {
				//Create ABI. Eventually, have this saved locally rather than
				//compile everytime
				//TODO
				code = fs.readFileSync('Voting.sol').toString();
				compiledCode = solc.compile(code);
				abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);

				//grab previously deployed contract to play with
				VotingContract = web3.eth.contract(abiDefinition);
				contractInstance = VotingContract.at(addressList[0]);

				//vote!
				//this is just for basic functionality
				result = contractInstance.vote.call("lol", {from: web3.eth.accounts[0], gas: 4000000});
				contractInstance.vote("lol", {from: web3.eth.accounts[0], gas: 4000000});
				return resolve({value: result});

			}
			catch(e){
				console.log('Error with vote transaction\n');
				console.log(e);
				return reject(e);
			}
		});
	}
	return obj;
};