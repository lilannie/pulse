const fs = require('fs');
//get rid of this!!! we don't  need to compile every time!
//TODO
const solc = require('solc');

module.exports = (web3, contractAddressList) => {
	var obj = {};

	obj.createContract = (itemID, responses) => {
		return new Promise(async (resolve, reject) => {
			var result = {};

			try {
				var code = fs.readFileSync('Voting.sol').toString();
				var compiledCode = solc.compile(code);
				var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
				var VotingContract = web3.eth.contract(abiDefinition);
				var byteCode = compiledCode.contracts[':Voting'].bytecode;
				var deployedContract = VotingContract.new(itemID, responses,{data: byteCode, from: web3.eth.accounts[0], gas: 9000000});
				var contractInstance = VotingContract.at(deployedContract.address);

				while(true){
					if(deployedContract.address){
						result.address = deployedContract.address;
						result.abi = abiDefinition;
						contractAddressList.push(result);
						return resolve({ minedAddress: result.address});
					}
					await sleep(1000);
				}
			}
			catch(e){
				console.log('Contract creation error\n');
				console.log(e);
				return reject(e);
			}
		});
	}
	return obj;
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}