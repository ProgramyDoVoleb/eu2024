import {useData} from '@/stores/data';
import { useCore, cdn, today } from '@/stores/core';
import elections from '@/stores/enums/elections';
import {url, date, number, truncate, domain, con, sortBy} from '@/pdv/helpers';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import {ga} from '@/pdv/analytics';
import NewsItem from '@/components/news-item/do.vue'
import MailchimpSignup from '@/components/mailchimp/do.vue';
import ReportForm from '@/components/report-form/do.vue';
import ElectionPoll from '@/views/polls/poll/do.vue';
import NewsBlock from '@/components/news-block/do.vue'

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			cdn,
			today,
			selected: []
		}
	},
  components: {
	NewsItem, MailchimpSignup, ReportForm, ElectionPoll, NewsBlock
  },
	computed: {
		$store: function () {
			return useData()
		},
		core: function () {
			return useCore()
		},
		election_types: function () {
			return elections;
		},
		news: function () {
			return this.$store.getters.pdv('news/election/161');
		},
		elections: function () {
			return this.$store.getters.pdv('elections/fetch/161');
		},
		polls: function () {
			return this.$store.getters.pdv('polls/election/161');
		},
		parties: function () {
			return this.$store.getters.pdv('parties/1,5,7,47,53,166,1245,720,721,768,1114,1327');
		}
	},
  methods: {
		url,
		date,
		number,
		truncate,
		domain, 
		con,
		colorByItem,
		logoByItem,
		sortBy,
		filterMe: function (id) {
			if (this.selected.find(x => x === id)) {
				this.selected.splice(this.selected.findIndex(x => x === id), 1)
			} else {
				this.selected.push(id);
			}
		},
		determineColorByAge: function (party, index) {
			var p = this.elections.list[0].$kandidati.find(x => x.ESTRANA === party.ESTRANA && x.PORCISLO === index);

			var color = 'background: transparent';
			var opacity = 'opacity: 1';

			if (p) {
				color = 'background: var(--greyish)';
				// opacity = 'opacity: ' + Math.round((p.VEK - 15) / 5) / 8; 

				if (p.VEK < 30) {
					color = 'background: var(--green)';
					// opacity = 'opacity: ' + (Math.floor(p.VEK - 11) / 3) / 8;
				} 
				if (p.VEK > 65) {
					color = 'background: var(--red)';
					// opacity = 'opacity: ' + (Math.floor(p.VEK - 55) / 5) / 8;
				} 
			}

			return [color, opacity].join(';');
		},
		determineColorByTitle: function (party, index) {
			var p = this.elections.list[0].$kandidati.find(x => x.ESTRANA === party.ESTRANA && x.PORCISLO === index);

			var color = 'background: transparent';
			var opacity = 'opacity: 1';

			if (p) {
				color = 'background: var(--greyish)';
				opacity = 'opacity: 1'; 

				if (p.TITULPRED || p.TITULZA) {
					color = 'background: var(--blue)';
					opacity = 'opacity: 1';
				}
			}

			return [color, opacity].join(';');
		},
		determineColorBySex: function (party, index) {
			var p = this.elections.list[0].$kandidati.find(x => x.ESTRANA === party.ESTRANA && x.PORCISLO === index);

			var color = 'background: transparent';
			var opacity = 'opacity: 1';

			if (p) {
				color = 'background: var(--greyish)';
				opacity = 'opacity: 1'; 

				if (this.determineWoman(p)) {
					color = 'background: var(--red)';
					opacity = 'opacity: 1';
				}
			}

			return [color, opacity].join(';');
		},
		determineColorByBEZPP: function (party, index) {
			var p = this.elections.list[0].$kandidati.find(x => x.ESTRANA === party.ESTRANA && x.PORCISLO === index);

			var color = 'background: transparent';
			var opacity = 'opacity: 1';

			if (p) {
				color = 'background: var(--greyish)';
				opacity = 'opacity: 1'; 

				if (p.PSTRANA === 99) {
					color = 'background: var(--grey)';
					opacity = 'opacity: 1';
				}
			}

			return [color, opacity].join(';');
		},
		determineWoman: function (p) {
			return p.JMENO[p.JMENO.length - 1] === 'a' || p.JMENO[p.JMENO.length - 1] === 'e' || p.PRIJMENI[p.PRIJMENI.length - 1] === 'á';
		}
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga("Přehled kandidátů");
  }
};
