module.exports = {
	getAllTopics: () => {
		return [
			{
				_id: 1,
				title: 'Gun Control'
			},
			{
				_id: 2,
				title: 'Trump'
			},
			{
				_id: 3,
				title: 'Trade War'
			},
			{
				_id: 4,
				title: 'Immigration'
			},
			{
				_id: 5,
				title: 'Taxes'
			},
			{
				_id: 6,
				title: 'Russian Hacking'
			},
			{
				_id: 7,
				title: 'Facebook Data'
			},
			{
				_id: 8,
				title: 'Taxes'
			}
		];
	},

	getTopicPosts: topic_id => {
		return [
			{
				_id: 1,
				content: 'Post Content',
				rank: 1,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				],
			},
			{
				_id: 2,
				content: 'Post Content',
				rank: 2,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				]
			},
			{
				_id: 3,
				content: 'Post Content',
				rank: 3,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				]
			},
			{
				_id: 4,
				content: 'Post Content',
				rank: 4,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				]
			},
			{
				_id: 5,
				content: 'Post Content',
				rank: 5,
				date_created: '03/24/2018 06:33:00',
				location: {},
				comments: [
					{
						_id: 1,
						content: 'Comment Content',
						rank: 1,
						date_created: '03/24/2018 06:33:00'

					}
				]
			}
		];
	},

	getTopicVotables: topic_id => {
		return [
			{
				_contract_id: 1,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 1
			},
			{
				_contract_id: 2,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 2
			},
			{
				_contract_id: 3,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 3
			},
			{
				_contract_id: 4,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 4
			},
			{
				_contract_id: 5,
				creator: {
					firstName: 'Annie',
					lastName: 'Steenson'
				},
				title: 'Votable Title',
				description: 'Votable Description',
				choices: ['Agree', 'Disagree', 'Neutral'],
				rank: 5
			}
		];
	},

	getVoterHistory: user_blockchain_id => {
		return {
			1: 'Agree', // _contract_id: choice the user made
			2: 'Neutral',
			3: 'Disagree'
		};
	},

	saveVote: (user_blockchain_id, votable_contract_id, choice) => {
		// Check if user has already voted on the votable, if so update that vote
		// If the user has not already voted on the votable, create a vote
		return {
			status: 'Success',
			error: null
		};
	}
};