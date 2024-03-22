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
import EngagementResultTip from '@/components/engagement/result-tip/do.vue';
import PartyPreview from '@/components/party-preview/do.vue';
import NewsBlock from '@/components/news-block/do.vue'

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			cdn,
			today,
			log: {
				types: {
					'about': 'Představení',
					'color': 'Barva',
					'email': 'E-mail',
					'document': 'Dokument',
					'phone': 'Telefonní číslo',
					'address': 'Adresa',
					'video': 'Volební spot',
					'web': 'Webové stránky',
					'link': 'Odkaz',
					'social': 'Odkaz na profil na sociální síti',
					'wiki': 'Odkaz na profil na Wikipedii',
					'logo': 'Logo',
					'motto': 'Slogan',
					'photo': 'Profilová fotka',
					'gallery': 'Fotka do galerie',
					'support': 'Podpora',
					'values': 'Hodnota',
					'pr': 'PR',
					'program': 'Odkaz na programový dokument',
					'graphics': 'Volební materiál',
					'media': 'Výstup pro média',
					'event': 'Událost',
					'note': 'Poznámka',
					'mfo': 'Pohlaví',
					'core': 'Registr'
				},
				action: {
					add: '+',
					replace: '+',
					hide: '–',
					show: '+',
				}
			}
		}
	},
  components: {
	NewsItem, MailchimpSignup, ReportForm, ElectionPoll, EngagementResultTip, PartyPreview, NewsBlock
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
		$getParty: function (hash) {
			var item = this.parties.list.find(x => x.hash === hash);

			if (!item) {
				item = this.parties.list.find(x => x.reg === hash);
			}

			if (!item) {
				item = this.parties.list.find(x => x.VSTRANA == hash);
			}

			if (!item && this.elections) {
				item = this.elections.cis.strany.find(x => x.VSTRANA == hash);
			}

			return item;
		},
		sortByPorCislo: function (list) {
			list.sort((a, b) => (a.PORCISLO || 1000) - (b.PORCISLO || 1000));

			return list;
		}
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga();
		
	setTimeout(() => {
		if (location.hash != '') {
			// console.log(123, this.$el.querySelector("[name=" + location.hash.split('#')[1] + "]"));
			this.$el.querySelector("[name=" + location.hash.split('#')[1] + "]").scrollIntoView({behavior: "smooth", block: "center"});
		}
	}, 1000);
  }
};
