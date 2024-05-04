import {useData} from '@/stores/data';
import { cdn, today } from '@/stores/core';
// import { useEnums } from '@/stores/enums';
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
				{type: 2, designee: null, label: 'Volební témata', hash: 'tema'},
				{type: 1, designee: null, label: 'Otázky', hash: 'otazka'},
				{type: 1, designee: 1, label: 'Otázky pro strany', hash: 'otazka'},
				{type: 1, designee: 2, label: 'Otázky pro kandidáty', hash: 'otazka'},
				{type: 3, designee: null, label: 'Volební kalkulačka', hash: 'kalkulacka/otazka'}
			],
			hasObvody: this.hash === 'senatni-volby',
			hasKraje: this.hash === 'krajske-volby',
			hasObce: this.hash === 'komunalni-volby',
			hasStrany: false
		}
	},
	computed: {
		$store: function () {
			return useData()
		},
		enums: function () {
			return {}; // useEnums()
		},
		data: function () {
			var d = this.$store.getters.pdv('elections/qa/' + this.qid + (this.$route.query.vyber ? ':' + this.$route.query.vyber : ''));

			if (d) {
				ga({title: d.list[0].question + ' - Evropské volby 2024', path: this.$route.path});
				this.hasStrany = !!d.list[0].$body && !!d.list[0].$body.find(x => x.$strana);
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

						if (!item.$strana.$data) item.$strana.$data = this.data.cis.strany.find(x => x.VSTRANA === item.$strana.VSTRANA).$data;
					}
				});

				list = sortBy(list, 'ZKRATKA', '', true);
			}

			return list;
		}
	},
	methods: {
		date, sortBy, logoByItem, truncate, slide,
		sortByDeepPrijmeni: function (list) {
			var arr = [];

			list.forEach(x => {
				if (!arr.find(y => y.pointer === x.pointer)) arr.push(x);
			});

			arr.sort((a, b) => a.$kandidat.PRIJMENI.localeCompare(b.$kandidat.PRIJMENI, 'cs'));

			return arr;
		},
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
