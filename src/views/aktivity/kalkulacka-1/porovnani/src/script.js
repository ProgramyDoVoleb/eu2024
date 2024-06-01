import {ga} from '@/pdv/analytics';
import { cdn } from '@/stores/core';
import { useData } from '@/stores/data';
import {logoByItem, colorByItem} from '@/components/results/helpers';
import {number, sortBy, date, round, unique} from '@/pdv/helpers';
import {processParty} from '@/components/engagement/calc-1/calc';
import html2canvas from 'html2canvas'
import PartyPreview from '@/components/party-preview/do.vue';

export default {
	name: 'layout-activity-poll1',
	props: ['id'],
	data: function () {
		return {
			cdn,
			result: null,
			type: 0,
			limit: true,
			imagedata: null,
			sublist: [],
			focus: null,
			width: 0
		}
	},
	components: {
		PartyPreview
	},
  computed: {
	$store: function () {
		return useData()
	},
	data: function () {
		return this.$store.getters.pdv('engagement/eu24-calc-prep');
	},
	elections: function () {
		return this.$store.getters.pdv('elections/fetch/161');
	},
	list: function () {
		if (!this.type) return;

		var list = [];

		if (this.sublist.length > 0) {
			this.result.parties.forEach(x => {
				if (this.sublist.indexOf(x.id) > -1) {
					list.push(x);
				}
			});	
		} else {
			this.result.parties.forEach(x => list.push(x));	
		}

		return list;
	}
  },
  methods: {
	number, sortBy, date, round, unique,
	logoByItem, colorByItem,
	sublist_toggle: function (id) {
		if (this.sublist.find(x => x === id)) {
			this.sublist.splice(this.sublist.findIndex(x => x === id), 1)
		} else if (this.sublist.length < 6) {
			this.sublist.push(id);
		}
	}
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga("Porovnání volební kalkulačky");
	this.width = window.innerWidth;

	window.addEventListener('resize', () => {
		this.width = window.innerWidth;
	});
  }
};
