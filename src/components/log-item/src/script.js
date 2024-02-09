import {date} from '@/pdv/helpers';

export default {
	name: 'LogItem',
	props: ['data', 'list', 'small'],
	data: function () {
		return {
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
				'media': 'Média',
				'event': 'Událost',
				'note': 'Poznámka',
				'mfo': 'Pohlaví',
				'core': 'Registr'
			},
			action: {
				add: 'Přidána položka',
				replace: 'Nahrazena položka',
				hide: 'Skryta položka',
				show: 'Znovuzobrazena položka',
			},
			actionSmall: {
				add: '+',
				replace: '+',
				hide: '×',
				show: '+',
			}
		}
	},
	computed: {
		item: function () {
			return this.list && this.list.find(x => x.id === Number(this.data.impact.split(':')[1]))
		}
	},
	methods: {
		date
	}
};
