import { useCore } from '@/stores/core'

export default {
	name: 'main-header',
	props: ['logo', 'name', 'tipsPrimator', 'placeholder'],
	data: function () {
		return {
			core: useCore(),
			pass: null,
			showMenu: false,
			showMenu2: false,
			querySearchTown: null,
			querySearchTownSearching: false,
			list: [
				{label: 'Přehled stran', to: '/prehled'},
				// {label: 'Strany', to: '/strany'},
				{label: 'Kandidáti', to: '/kandidati'},
				{label: 'Porovnejte si', to: '/otazky'},
				{label: 'Jak volit?', to: '/jak-volit'},
				{label: 'Události', to: '/udalosti'},
				{label: 'Průzkumy', to: '/volebni-pruzkumy'},
				{label: 'Novinky', to: '/novinky'},
				{label: 'Pro kandidáty', to: '/pro-kandidaty', class: 'strong'}
			]
		}
	},
	computed: {
		loaded: function () {
			var test = true;

			// if (!this.$store.state.dynamic.source.find(x => x.source === 'obecne/okresy-flat')) test = false;
			// if (!this.$store.state.dynamic.source.find(x => x.source === 'volby/kom/2022/static/obce-flat')) test = false;
			// if (!this.$store.state.dynamic.pdv.find(x => x.source === 'party/list')) test = false;

			return test;
		},
	},
	watch:{
		$route (){
			this.showMenu = false;
		}
	},
	methods: {
		remove: function (item) {
			this.notifications.update(item, 'Akce zrušena', 'red')
		}
	},
	mounted: function () {
		// if (this.$route.query.dnt) {
		// 	this.$refs.authform.opened = true;
		// }
	}
};
