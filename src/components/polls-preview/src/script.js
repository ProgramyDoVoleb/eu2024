import {date, number, truncate, color, indicator, con, round} from "@/pdv/helpers";
import {useData} from '@/stores/data';

export default {
	name: 'PollsPreview',
	props: ['poll', 'previous', 'parties_generic', 'both'],
	data: function () {
		return {
			showMandates: false,
			mandates: [],
			selected: []
		}
	},
	components: {
	},
	methods: {
		date, number, truncate, color, indicator, con
	},
	computed: {
		$store: function () {
			return useData()
		},
		parties: function () {
			if (this.parties_generic) return this.parties_generic;

			var list = [];

			this.poll.entries.forEach(x => {
				if (list.indexOf(x.party) === -1) list.push(x.party);
			});

			if (this.previous) {
				this.previous.entries.forEach(x => {
					if (list.indexOf(x.party) === -1) list.push(x.party);
				});
			}

			return this.$store.getters.pdv('parties/as-of/' + this.poll.datum + ';' + list.join(','));
		}
	},
	mounted: function () {
	}
};
