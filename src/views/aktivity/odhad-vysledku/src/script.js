import { useCore, cdn, today } from '@/stores/core';
import {useData} from '@/stores/data';
import {ga} from '@/pdv/analytics';
import { date, sortBy } from '@/pdv/helpers';
import { colorByItem } from '@/components/results/helpers';
import ResultGuess from '@/components/engagement/result-tip/do.vue'
import ElectionPoll from '@/views/polls/poll/do.vue';

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			cdn
		}
	},
  components: {
	ResultGuess, ElectionPoll
  },
	computed: {
		$store: function () {
			return useData()
		},
		elections: function () {
			return this.$store.getters.pdv('elections/fetch/161');
		},
		results: function () {
			return this.$store.getters.pdv('engagement/eu24-result-tip-2');
		},
	},
  methods: {
	date, sortBy, colorByItem,

	resultsAsPoll: function (list, name, created) {
		var data = {
			agency: name,
			datum: created,
			entries: [],
			cis: {
				strany: this.elections.cis.strany
			}
		}

		list.forEach(party => {
				if (party.pct) {
					data.entries.push({
						name: this.elections.list[0].$strany.find(x => x.VSTRANA === party.id).ZKRATKA,
						color: colorByItem(this.elections.list[0].$strany.find(x => x.VSTRANA === party.id), this.elections),
						party: party.id,
						value: party.pct
					})
				}
			})

			data.entries.sort((a, b) => b.value - a.value);

		return data;
	},
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga("Odhad výsledku");
  }
};
