import {useEngagement} from '@/stores/engagement';
import questions from '@/components/engagement/poll/src/questions';

export default {
	name: 'EngagementPoll',
	props: ['data'],
	data: function () {
		return {
			questions,
			form: {
				datum: new Date().toISOString(),
				answers: [
					[], [], [], []
				]
			},
			sent: false
		}
	},
	components: {
	},
	computed: {
		engagement: function () {
			return useEngagement();
		},
		used: function () {
			return this.engagement.used(null, 'eu24-poll-1');
		}
	},
	methods: {
		submit: function () {
			this.engagement.add(this.$route.fullPath, 'eu24-poll-1', JSON.stringify(this.form.answers), 'Posílám odpovědi do ankety');
		},
		toggle: function (question, answer) {
			if (questions[question].limit) {
				if (this.form.answers[question].indexOf(answer) > -1) {
					this.form.answers[question].splice(this.form.answers[question].indexOf(answer), 1);
				} else if (this.form.answers[question].length < (questions[question].limit || 1)) {
					this.form.answers[question].push(answer);
				}
			} else {
				this.form.answers[question].pop();
				this.form.answers[question].push(answer);
			}
		}
	}
};
