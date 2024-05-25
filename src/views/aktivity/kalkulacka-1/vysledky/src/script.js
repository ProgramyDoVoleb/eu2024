import {ga} from '@/pdv/analytics';
import { cdn } from '@/stores/core';
import { useData } from '@/stores/data';
import {logoByItem, colorByItem} from '@/components/results/helpers';
import {number, sortBy, date, round} from '@/pdv/helpers';
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
	results: function () {
		var d = this.$store.getters.pdv('engagement/fetch/' + this.id);

		if (d && this.data) {
			
			this.result = {
				answers: d.list[0].value.answers,
				anyimp: d.list[0].value.anyimp,
				parties: []
			};

			this.type = d.list[0].value.anyimp ? 1 : 2;

			this.data.parties.forEach(party => {
				var pp = processParty(party, this.data, this.result, true);

				if (pp) this.result.parties.push(pp);
			});
		}

		return d;
	},
	elections: function () {
		return this.$store.getters.pdv('elections/fetch/161');
	},
	list: function () {
		if (!this.type) return;

		if (this.type === 1) {
			this.result.parties.sort((a, b) => b.pwi - a.pwi);
		} else {
			this.result.parties.sort((a, b) => b.res - a.res);
		}

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
	number, sortBy, date, round,
	logoByItem, colorByItem,
	snapshot: function (ev) {
		html2canvas(this.$el.querySelector('._area'),{
			allowTaint: true,
			useCORS : true,
		}).then((canvas) => {
			this.$refs.canvas.appendChild(canvas);
			this.imagedata = canvas.toDataURL("image/png");

			canvas.style.width = '100%';
			canvas.style['max-width'] = canvas.width + 'px';
			canvas.style.height = 'auto';
		})
	},
	sublist_toggle: function (id) {
		if (this.sublist.find(x => x === id)) {
			this.sublist.splice(this.sublist.findIndex(x => x === id), 1)
		} else {
			this.sublist.push(id);
		}
	}
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga("Výsledky volební kalkulačky");
	this.width = window.innerWidth;

	window.addEventListener('resize', () => {
		this.width = window.innerWidth;
	});
  }
};
