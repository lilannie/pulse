module.exports = {
	/**
	 * 	comment = {
	 * 	  content: str
	 * 	  _creator_id: int
	 * 	}
 	 */
	createComment: comment => {
		return {
			status: 'Success',
			error: null
		};
	},
	/**
	 * 	votable = {
	 * 	  title: str,
	 * 	  description: str,
	 * 	  choices: [ strings ],
	 * 	  topics: [ ids ]
	 * 	}
	 */
	createVotable: votable => {
		return {
			status: 'Success',
			error: null
		}
	}
};