import {useEngagement} from '@/stores/engagement';
import {useData} from '@/stores/data';
import {sortBy} from '@/pdv/helpers';
import {colorByItem} from '@/components/results/helpers'
import ElectionPoll from '@/views/polls/poll/do.vue';

export default {
	name: 'EngagementResultTip',
	props: ['data'],
	data: function () {
		return {
			form: {
				name: '',
				datum: new Date().toISOString(),
				parties: []
			},
			eid: null
		}
	},
	components: {
		ElectionPoll
	},
	computed: {
		$store: function () {
			return useData()
		},
		engagement: function () {
			return useEngagement();
		},
		used: function () {
			return this.engagement.used(null, 'eu24-result-tip-2');
		},
		resultsAsPoll: function () {
			var data = {
				agency: 'Náhodný odhad',
				datum: new Date().toISOString(),
				entries: [],
				cis: {
					strany: this.data.cis.strany
				}
			}

			var list = this.engagement.list.find(x => x.hash === 'eu24-result-tip-2');

			if (list) {
				var json = JSON.parse(list.value);

				data.share = '/aktivity/odhad-vysledku?eu24-result-tip-2=' + list.token;

				if (json.name) data.agency += ' ' + json.name;
				if (list.now) data.datum = list.now;

				json.parties.forEach(party => {
					if (party.pct) {
						data.entries.push({
							party: party.id,
							value: party.pct
						})
					}
				})

				data.entries.sort((a, b) => b.value - a.value);
			}

			return data;
		},
		fetch: function () {
			if (!this.eid) return;

			var d = this.$store.getters.pdv('engagement/fetch/' + this.eid);

			if (d && d.list.length > 0) {
				this.engagement.silent(d.list[0].path, d.list[0].hash, JSON.stringify(d.list[0].value), d.list[0].datum, this.eid);
				setTimeout(() => {
					document.querySelector('.engagement-result-tip-2').scrollIntoView({behavior: "smooth", block: "center"});
				}, 1000);
			}

			return d;
		}
	},
	methods: {
		submit: function () {
			var vals = [];

			this.form.parties.forEach(party => {
				if (party.pct) {
					vals.push({
						id: party.id,
						pct: party.pct
					})
				}
			});

			this.engagement.add(this.$route.fullPath, 'eu24-result-tip-2', JSON.stringify({name: this.form.name, parties: vals}), 'Posílám odhad');
		},
		populateForm: function () {
			while (this.form.parties.length > 0) this.form.parties.pop();

			this.data.list[0].$strany.forEach(party => {
				this.form.parties.push({
					id: party.VSTRANA,
					eid: party.ESTRANA,
					name: party.NAZEV,
					short: party.ZKRATKA,
					color: colorByItem(party, this.data),
					pct: null
				});
			});

			this.form.parties.sort((a, b) => a.short.localeCompare(b.short, 'cs'));
		},
		clear: function (eid) {
			this.engagement.remove(eid);
			this.eid = null;
			document.querySelector('.engagement-result-tip').scrollIntoView({behavior: "smooth", block: "center"});
		}
	},
	mounted: function () {
		if (this.data) this.populateForm();

		if (this.$route.query['eu24-result-tip-2']) {
			this.eid = this.$route.query['eu24-result-tip-2'];
		}
	},
	watch: {
		data: function () {
			if (this.data) this.populateForm();
		}
	}
};
