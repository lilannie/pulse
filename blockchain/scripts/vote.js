const fs = require('fs');
module.exports = (web3, contractAddressList, userHistory) => {
	var obj = {};

	obj.vote = (contractAddress, voterAddress, response) => {
		return new Promise(async (resolve, reject) => {
			var result;
			var abiDef;

			try {
				//finds abi in list for the vote
				for (i = 0; i < contractAddressList.length; i++) {
					if (contractAddress == contractAddressList[i].address) {
						abiDef = contractAddressList[i].abi;
					}
				}
				VotingContract = web3.eth.contract(abiDef);
				contractInstance = VotingContract.at(contractAddress);

				//vote!
				result = contractInstance.vote.call(response, {from: voterAddress, gas: 4000000});
				contractInstance.vote(response, {from: voterAddress, gas: 4000000});

				//updates user history array
				//finds userHistory index by address
				//if vote is legitimatge
				if (result) {
					for (i = 0; i < userHistory.length; i++) {
						if (voterAddress == userHistory[i].voterAddress) {
							userHistory[i].contracts.push(contractAddress);
							userHistory[i].responses.push(response);
						}
					}
				}
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