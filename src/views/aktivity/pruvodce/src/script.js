import { ga } from '@/pdv/analytics';
import { cdn } from '@/stores/core';
import { useData } from '@/stores/data';
import { logoByItem, colorByItem } from '@/components/results/helpers';
import { sortBy, date, unique, domain } from '@/pdv/helpers';

import PartyPreview from '@/components/party-preview-large/do.vue';
import PersonPreviewLinear from '@/components/person-preview-linear/do.vue';
import PersonPreviewBlock from '@/components/person-preview-block/do.vue';
import ElectionPoll from '@/views/polls/poll/do.vue';

export default {
	name: 'layout-guide',
	data: function () {
		return {
			cdn,
			partyList: [],
			topic: null,
			calc: [],
			priorityLimit: [3,3,3],
			focus: null
		}
	},
	components: {
		PartyPreview, PersonPreviewLinear, PersonPreviewBlock, ElectionPoll
	},
	computed: {
		$store: function () {
			return useData()
		},
		elections: function () {
			return this.$store.getters.pdv('elections/fetch/161');
		},
		parties: function () {
			var arr = [];

			if (this.elections) {
				this.partyList.forEach(id => {
					arr.push(this.elections.list[0].$strany.find(x => x.id === id));
				})
			}

			return arr;
		},
		partiesData: function () {
			var arr = [];

			this.parties.forEach(party => {
				arr.push(
					this.$store.getters.pdv('pointers/full/csu_ep_rkl:' + party.id)
				);
			});

			return arr;
		},
		topicData: function () {
			return this.topic ? this.$store.getters.pdv('elections/qa/' + this.topic) : null;
		},
		calcData: function () {
			return this.calc.length > 0 ? this.$store.getters.pdv('engagement/eu24-calc-prep') : null;
		},
		candData: function () {
			var res = null;

			if (this.focus) {
				res = this.$store.getters.pdv('pointers/full/csu_ep_rk:' + this.focus)
			}

			return res;
		},
		polls: function () {
			return this.$store.getters.pdv('polls/election/161');
		}
	},
	methods: {
		sortBy, date, unique, domain,
		logoByItem, colorByItem,
		toggle: function (list, id) {
			if (list.find(x => x === id)) {
				list.splice(list.findIndex(x => x === id), 1)
			} else if (list.length < 3) {
				list.push(id);
			}
		},
		getQuestion: function (id) {
			var res = '';

			switch (id) {
				case 347: res = 'Hlavní volební priority'; break;
				case 348: res = 'Veto vs hlasování většinou'; break;
				case 349: res = 'Ekonomika vs Green Deal'; break;
				case 350: res = 'Přístup EU k ruské agresi'; break;
				case 351: res = 'Cíle a síla frakce'; break;
			}

			return res;
		}
	},
  mounted: function () {
    window.scrollTo(1, 0);
    ga("Průvodce");

	if (this.$route.query.vyber) {
		this.partyList = this.$route.query.vyber.split(',').map(x => Number(x));
	}
  }
};
