import {date, domain} from '@/pdv/helpers';
import NewsItem from '@/components/news-item/do.vue'
import NewsYear from '@/views/news/year/do.vue'
import NewsBlock from '@/components/news-block/do.vue'
import MailchimpSignup from '@/components/mailchimp/do.vue';
import {useData} from '@/stores/data';
import { useCore, cdn } from '@/stores/core';
import { regions } from '@/stores/enums';
import {ga} from '@/pdv/analytics';

export default {
	name: 'layout-news',
	data: function () {
		return {
			cdn,
			enums: {regions},
			election_types: {
				'EP': {hash: 'evropske-volby', name: 'Evropské volby'},
				'KV': {hash: 'komunalni-volby', name: 'Komunální volby'},
				'KZ': {hash: 'krajske-volby', name: 'Krajské volby'},
				'PREZ': {hash: 'prezidentske-volby', name: 'Prezidentské volby'},
				'PS': {hash: 'snemovni-volby', name: 'Sněmovní volby'},
				'SENAT': {hash: 'senatni-volby', name: 'Senátní volby'}
			},
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
					'mfo': 'Pohlaví'
				},
				action: {
					add: '+',
					replace: '+',
					hide: '–',
					show: '+',
				}
			},
			patterns: [
				{pattern: '2024-04', title: 'Duben 2024'},
				{pattern: '2024-03', title: 'Březen 2024'},
				{pattern: '2024-02', title: 'Únor 2024'},
				{pattern: '2024-01', title: 'Leden 2024'},
				{pattern: '2023', title: '2023'}
			]
		}
	},
	components: {
		NewsYear, MailchimpSignup, NewsItem, NewsBlock
	},
	computed: {
		$store: function () {
			return useData()
		},
		news: function () {
			return this.$store.getters.pdv('news/election-all/161')
		}
	},
  methods: {
	date, domain
  },
  mounted: function () {
    window.scrollTo(0, 0);
    ga("Novinky");
  }
};
