import {useData} from '@/stores/data';
import { useCore, cdn, today } from '@/stores/core';
import elections from '@/stores/enums/elections';
import medialinks from '@/stores/enums/links';
import {url, date, number, truncate, domain, con, sortBy, sortEvents, firstOfUnique} from '@/pdv/helpers';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import {ga} from '@/pdv/analytics';
import NewsItem from '@/components/news-item/do.vue'
import EventItem from '@/components/event-item/do.vue'
import MailchimpSignup from '@/components/mailchimp/do.vue';
import ReportForm from '@/components/report-form/do.vue';
import ElectionPoll from '@/views/polls/poll/do.vue';
import EngagementResultTip from '@/components/engagement/result-tip/do.vue';
import PartyPreview from '@/components/party-preview/do.vue';
import NewsBlock from '@/components/news-block/do.vue'
import Feedback1 from '@/components/engagement/feedback-1/do.vue'

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			cdn,
			today,
			medialinks,
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
			},
			photos: [
				"https://data.programydovoleb.cz/lide/uploads/801e8a3b-8eae-4049-bf2e-c7719c0ff82ajpeg___up_1630391619_93b63614217cc7c36b37c321669e4f2a.jpg",
				"https://static.programydovoleb.cz/2024/csu_ep_rk/0408/3276/55196a6861.jpg",
				"https://static.programydovoleb.cz/2024/csu_ep_rk/0412/3418/1596131a76.png",
				"https://static.programydovoleb.cz/2024/csu_ep_rk/0417/3309/900748f443.jpg",
				"https://static.programydovoleb.cz/2024/csu_ep_rk/0408/3294/86007539a5.webp",
				"https://static.programydovoleb.cz/2024/csu_ep_rk/0408/3274/43016bb77f.webp"
			]
		}
	},
  components: {
	NewsItem, EventItem, MailchimpSignup, ReportForm, ElectionPoll, EngagementResultTip, PartyPreview, NewsBlock, Feedback1
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
		sortBy, sortEvents,
		firstOfUnique,
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
