import {useData} from '@/stores/data';
import { useCore, cdn, today } from '@/stores/core';
import { useRoute } from 'vue-router';
import { regions } from '@/stores/enums';
import elections from '@/stores/enums/elections';
import logtypes from '@/stores/enums/log';
import {url, date, number, truncate, con, type, domain, sortByPorCislo, slide, unique, sortEvents} from '@/pdv/helpers';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import {ga} from '@/pdv/analytics';
import NewsItem from '@/components/news-item/do.vue'
import EventItem from '@/components/event-item/do.vue'
import ElectionResults from '@/views/volby/detail/do.vue';
import ProgramBlock from '@/components/program-block-dynamic/do.vue';
import ProfilePreview from '@/components/profile-preview/do.vue';
import ReportModal from '@/components/report-modal/do.vue';
import ReportForm from '@/components/report-form/do.vue';
import LogItem from '@/components/log-item/do.vue';
import PartyQuicklook from '@/components/party-quicklook/do.vue';
import CandidateStats from '@/components/candidate-stats/do.vue';
import PersonPreviewLinear from '@/components/person-preview-linear/do.vue';
import PersonPreviewBlock from '@/components/person-preview-block/do.vue';
import NewsBlock from '@/components/news-block/do.vue'

export default {
	name: 'layout-pointer',
	props: ['page', 'tableID'],
	data: function () {
		return {
			today,
			cdn,
			limit: 4,
			limitOff: false,
			questionLimit: 5,
			questionLimitOff: false,
			volbyType: 'evropske-volby',
			volbyID: 161,
			tableName: 'csu_ep_rkl',
			eventsLimit: 3,
			eventsOff: false
		}
	},
  components: {
	NewsItem,
	ElectionResults,
	ProgramBlock,
	ProfilePreview,
	ReportModal, ReportForm,
	LogItem,
	PartyQuicklook,
	CandidateStats,
	PersonPreviewLinear,
	PersonPreviewBlock,
	NewsBlock, EventItem
  },
	computed: {
		$store: function () {
			return useData()
		},
		// $route: function () {
		// 	return useRoute()
		// },
		core: function () {
			return useCore()
		},
		enums: function () {
			return {elections, logtypes}
		},
		table: function () {
			if (this.tableName) return this.tableName;

			// if (this.volbyType) {
				// var el = this.enums.elections.find(x => x.hash === this.volbyType);
				var name = ['csu'];

				// if (el) {
					name.push('ep');

					if (this.page) {
						if (this.page === "strana") name.push('rkl');
						if (this.page === "kandidat") name.push('rk');
					}
				// }

				return name.join('_');
			// }
		},
		data: function () {
			var d = this.$store.getters.pdv('pointers/full/' + this.table + ':' + this.tableID)

			if (d) {
				if (d.cis.okresy) {
					var arr = [];

					d.cis.okresy.forEach(item => {
						if (!arr.find(x => x.NUMNUTS === item.NUMNUTS)) {
							arr.push(item);
						}
					});

					arr.sort((a, b) => a.NAZEV.localeCompare(b.NAZEV, 'cs'));

					d.cis.okresy = arr;
				} 
				if (d.cis.kraje) {
					var arr = [];

					d.cis.kraje.forEach(item => {
						if (!arr.find(x => x.KRAJ === item.KRAJ) && String(item.NUTS).length === 5) {
							arr.push(item);
						}
					});

					arr.sort((a, b) => a.NAZEV.localeCompare(b.NAZEV, 'cs'));

					d.cis.kraje = arr;
				} 
		
				setTimeout(() => {
					if (location.hash != '') {
						this.$el.querySelector("[name=" + location.hash.split('#')[1] + "]").scrollIntoView({behavior: "smooth", block: "center"});
					}
				}, 500);
			}

			return d;
		},
		news: function () {
			return this.data ? this.data.news : null;
		},
		headline: function () {
			if (!this.data) return 'Načítám...';

			var hdl = "Chyba";
			

			if (this.current.NAZEV) hdl = this.current.NAZEV;
			
			if (this.current.JMENO) hdl = this.current.JMENO + ' ' + this.current.PRIJMENI;

			var title = [hdl];
			if (this.current.$strana && this.current.$strana.length > 0) title.push(this.current.$strana[0].ZKRATKA);
			title.push(this.enums.elections.find(x => x.key === this.data.cis.volby[0].typ).name + ' ' + (this.data.cis.volby[0].datum ? date(this.data.cis.volby[0].datum, 3) : this.data.cis.volby[0].cirka));

			ga(title.join(' - '));

			return hdl;
		},
		current: function () {
			var res = null;

			if (this.data && this.data.list.length === 1) {
				res = this.data.list[0];
			}
			if (this.data && this.data.list.length > 1) {
				res = {
					$data: [],
					$kandidati: [],
					$program: [],
					$priority: [],
					$odpovedi: [],
					$vysledky: [],
					$zastupitelstvo: [],
					$obvody: [],
					HLASY_STR: 0,
					KODZASTUP: null,
					MAND_STR: 0,
					NAZEV: null,
					NAZEVZAST: null,
					OKRES: null,
					OSTRANA: null,
					SLOZENI: null,
					VSTRANA: null,
					ZKRATKA: null
				};

				this.data.list.forEach(obvod => {
					res.$obvody.push(obvod);

					obvod.$kandidati.forEach(x => res.$kandidati.push(x));

					res.$zastupitelstvo = obvod.$zastupitelstvo;
					res.HLASY_STR += obvod.HLASY_STR;
					res.KODZASTUP = obvod.KODZASTUP;
					res.MAND_STR += obvod.MAND_STR;
					res.NAZEV = obvod.NAZEV;
					res.NAZEVZAST = obvod.NAZEVZAST;
					res.OKRES = obvod.OKRES;
					res.OSTRANA = obvod.OSTRANA;
					res.SLOZENI = obvod.SLOZENI;
					res.VSTRANA = obvod.VSTRANA;
					res.ZKRATKA = obvod.ZKRATKA;

				});

			}

			return res;
		},
		$volby: function () {
			var d = this.data ? this.data.cis.volby[0] : null; 

			if (d) {
				d.$about = this.enums.elections.find(x => x.key === d.typ);
				// this.limit = d.status === 1 ? 100 : 8;
			}

			return d;
		},
		$strana: function () {
			return this.current && this.current.$strana ? this.current.$strana[0] : null
		},
		$coalition: function () {
			return this.current && this.data.cis.strany.find(x => x.VSTRANA === this.current.VSTRANA).$coalition ? this.data.cis.strany.find(x => x.VSTRANA === this.current.VSTRANA).$coalition : null
		},
		specs: function () {
			var res = null;

			if (this.current && this.current.OBVOD) res = this.current.OBVOD;
			if (this.current && this.current.KRZAST) res = this.current.KRZAST;
			if (this.current && this.current.KODZASTUP) res = this.current.KODZASTUP;

			return res;
		},
		label: function () {
			var res = null;

			if (this.current && this.current.OBVOD) res = 'obvod ' + this.current.OBVOD + ' · ' + this.data.cis.obvody.find(x => x.OBVOD === this.current.OBVOD).NAZEV;
			if (this.current && this.current.KRZAST) res = this.data.cis.kraje.find(x => x.KRAJ === this.current.KRZAST).NAZEV;
			if (this.current && this.current.KODZASTUP) res = this.data.cis.obce.find(x => x.NUM === this.current.KODZASTUP).NAZEV;

			return res;
		},
		contacts: function () {
			var arr = [];

			if (this.current) {
				['email', 'phone', 'address'].forEach(type => {
					if (this.current.$data[type]) {
						this.current.$data[type].forEach(x => {
							if (!arr.find(y => y.value === x.value)) arr.push(x);
						});
					}
				});
			}

			arr.sort((a, b) => a.type.localeCompare(b.type, 'cs'));

			return arr;
		},
		links: function () {
			var arr = [];

			if (this.current) {
				['wiki', 'social'].forEach(type => {
					if (this.current.$data[type]) {
						this.current.$data[type].forEach(x => {
							if (!arr.find(y => y.value === x.value || domain(y.value) === domain(x.value))) arr.push(x);
						});
					}
				});
			}

			arr.sort((a, b) => a.type.localeCompare(b.type, 'cs'));

			return arr;
		},
		linksAll: function () {
			var arr = [];

			if (this.current) {
				['web', 'social', 'link', 'wiki'].forEach(type => {
					if (this.current.$data[type]) {
						this.current.$data[type].forEach(x => {
							if (!arr.find(y => y.value === x.value || domain(y.value) === domain(x.value))) arr.push(x);
						});
					}
				});
			}

			// arr.sort((a, b) => a.type.localeCompare(b.type, 'cs'));

			return arr;
		},
		consolidatedNews: function () {
			var list = [];

			if (this.news) {
				var datelist = [];

				this.news.list.forEach(x => datelist.push(x));
				this.news.auto.forEach(x => datelist.push(x));
				this.news.log.forEach(x => datelist.push(x));

				datelist.forEach(x => x.datum = x.date || x.datum);

				var dates = unique(datelist, 'datum');

				dates.forEach(datum => {
					var o = {
						datum,
						list: this.news.list.filter(x => x.datum === datum),
						auto: this.news.auto.filter(x => x.datum === datum),
						log: this.news.log.filter(x => x.date === datum),
					}

					list.push(o);
				})
			}

			list.sort((a, b) => b.datum.localeCompare(a.datum, 'cs'));

			return list;
		}
	},
  methods: {
		url,
		con,
		date,
		type,
		number,
		domain,
		truncate,
		colorByItem,
		logoByItem,
		sortByPorCislo, sortEvents,
		slide,
		checkDuplicates: function (list) {
			var arr = [];

			list.forEach(x => {
				if (!arr.find(y => y.value === x.value)) arr.push(x);
			});

			return arr;
		},
		sortByPorCislo: function (list) {
			list.sort((a, b) => (a.PORCISLO || 1000) - (b.PORCISLO || 1000));

			return list;
		}
  },
  mounted: function () {
    window.scrollTo(0, 1);
  },
  watch: {
	data: function () {
		window.scrollTo(0, 1);
	}
  }
};
