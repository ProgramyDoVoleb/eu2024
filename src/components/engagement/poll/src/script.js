import { useEngagement } from '@/stores/engagement';
import { useData } from '@/stores/data';
import { round, date } from '@/pdv/helpers';
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
		$store: function () {
			return useData()
		},
		engagement: function () {
			return useEngagement();
		},
		used: function () {
			return this.engagement.used(null, 'eu24-poll-1');
		},
		results: function () {
			var loaded = this.$store.getters.pdv('engagement/eu24-poll-1');
			var data = {
				cache: null,
				summary: {
					count: 0,
					topic: [],
					party: [],
					attendance: [],
					region: []
				}
			};

			if (loaded) {
				data.cache = loaded.cache;
				data.summary.count = loaded.summary.count;

				loaded.summary.topic.forEach(x => data.summary.topic.push(x));
				loaded.summary.party.forEach(x => data.summary.party.push(x));
				loaded.summary.attendance.forEach(x => data.summary.attendance.push(x));
				loaded.summary.region.forEach(x => data.summary.region.push(x));
			}

			if (this.used || (true && this.form.answers.find(x => x.length > 0))) {
				data.summary.count++;
				if (this.form.answers[0].length > 0) {
					if (this.form.answers[0].length === 3) {
						data.summary.topic[this.form.answers[0][0]] += 4;
						data.summary.topic[this.form.answers[0][1]] += 2;
						data.summary.topic[this.form.answers[0][2]] += 1;
					}
					if (this.form.answers[0].length === 2) {
						data.summary.topic[this.form.answers[0][0]] += 5;
						data.summary.topic[this.form.answers[0][1]] += 2;
					}
					if (this.form.answers[0].length === 1) {
						data.summary.topic[this.form.answers[0][0]] += 7;
					}
				}
				if (this.form.answers[1].length > 0) {
					if (this.form.answers[1].length === 3) {
						data.summary.party[this.form.answers[1][0]] += 4;
						data.summary.party[this.form.answers[1][1]] += 2;
						data.summary.party[this.form.answers[1][2]] += 1;
					}
					if (this.form.answers[1].length === 2) {
						data.summary.party[this.form.answers[1][0]] += 5;
						data.summary.party[this.form.answers[1][1]] += 2;
					}
					if (this.form.answers[1].length === 1) {
						data.summary.party[this.form.answers[1][0]] += 7;
					}
				}
				if (this.form.answers[2].length > 0) data.summary.attendance[this.form.answers[2][0]]++;
				if (this.form.answers[3].length > 0) data.summary.region[this.form.answers[3][0]]++;
			}

			return data;
		},
	},
	methods: {
		round, date,
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
