const votable_ctrl = require('./backend/mongo/controllers/votable_ctrl');

votable_ctrl.getVotesGroupByState('0xf29c8878f2b515cb58e1b83e039de0e03559aa1d').then(result => {
	console.log(result)
}).catch(error => {
	console.log(error);
});
