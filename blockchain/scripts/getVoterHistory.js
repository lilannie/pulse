module.exports = (web3, contractAddressList, contractAddress) => {
	var obj = {};

	obj.getVoterHistory = (contractAddress) => {
		return new Promise( (resolve, reject) => {
			var result;
			var abiDef;

			try {
				//finds abi in list for contract instance
				for (i = 0; i < contractAddressList.length; i++) {
					if (contractAddress == contractAddressList[i].address) {
						abiDef = contractAddressList[i].abi;
					}
				}
				VotingContract = web3.eth.contract(abiDef);
				contractInstance = VotingContract.at(contractAddress);

				//get history!
				result = contractInstance.getVoterHistory.call({from: web3.eth.accounts[0], gas: 4000000});
				contractInstance.getVoterHistory({from: web3.eth.accounts[0], gas: 4000000});
				
				pair = {};
				pair.addresses = result[0];
				pair.response = [];

				//loop through and convert bytes32 to string
				//for readable output
				for(i = 0; i < result[0].length; i++) {
					pair.response.push(web3.toAscii(result[1][i]).replace(/\u0000/g, ''));
				}

				return resolve({value: pair});
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