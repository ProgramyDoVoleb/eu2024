import {useData} from '@/stores/data';
import { cdn, today } from '@/stores/core';
import {url, date, number, truncate, sortBy, unique, slide} from '@/pdv/helpers';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import {ga} from '@/pdv/analytics';

export default {
	name: 'volby-qa',
	props: ['hash', 'id', 'qid'],
	data: function () {
		return {
			cdn,
			qenum: [
				{type: 2, label: 'Volební témata', hash: 'tema'},
				{type: 1, label: 'Otázky pro kandidáty', hash: 'otazka'},
				{type: 3, label: 'Volební kalkulačka', hash: 'kalkulacka'}
			],
			hasStrany: false
		}
	},
	computed: {
		$store: function () {
			return useData()
		},
		data: function () {
			var d = this.$store.getters.pdv('elections/qa/' + this.qid + (this.$route.query.vyber ? ':' + this.$route.query.vyber : ''));

			if (d) {
				// ga(d.list[0].question + ' - Evropské volby 2024', 'tema/' + this.qid);
				this.hasStrany = d.list[0].$body && !!d.list[0].$body.find(x => x.$strana);
			}

			return d;
		},
		$volby: function () {
			return this.data ? this.data.cis.volby[0] : null;
		},
		$answers: function () {
			return this.data ? this.data.list[0].$odpovedi : null;
		},
		$strany: function () {
			if (!this.data) return;

			var list = null;

			if (this.data.list[0].$body && this.data.list[0].$body.find(x => x.$strana)) {
				list = [];

				this.data.list[0].$body.filter(x => x.$strana).forEach(item => {
					if (!list.find(x => x.id === item.$strana.id)) {
						list.push(item.$strana);
					}
				});

				list = sortBy(list, 'NAZEV', '', true);
			}

			return list;
		}
	},
	methods: {
		date, sortBy, logoByItem, truncate, colorByItem, slide, url,
		sortByDeepPorCislo: function (list) {
			var arr = [];

			list.forEach(x => {
				if (!arr.find(y => y.pointer === x.pointer)) arr.push(x);
			});

			arr.sort((a, b) => a.$kandidat.PORCISLO - b.$kandidat.PORCISLO);

			return arr;
		},
		onlyLast: function (list) {
			var arr = [];
			var res = [];

			list.filter(x => x.status === 1).forEach(item => arr.push(item));
			arr.sort((a, b) => b.id - a.id);

			return arr[0];
		}
	},
	mounted: function () {
	  window.scrollTo(0, 1);
	}
};
