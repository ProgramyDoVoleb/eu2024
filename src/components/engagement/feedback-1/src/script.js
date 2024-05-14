import {useEngagement} from '@/stores/engagement';
import {userInput} from '@/pdv/helpers';

export default {
	name: 'EngagementFeedback',
	data: function () {
		return {
			answer: null,
			sent: false
		}
	},
	components: {},
	computed: {
		engagement: function () {
			return useEngagement();
		},
		used: function () {
			return this.engagement.used(this.$route.fullPath, 'eu24-feedback-1');
		}
	},
	methods: {
		click: function () {
			this.engagement.add(this.$route.fullPath, 'eu24-feedback-1', userInput(this.answer), 'Odesílám zpětnou vazbu');
		}
	}
}