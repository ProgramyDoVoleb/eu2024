import {useData} from '@/stores/data';
import {type, date} from '@/pdv/helpers';

export default {
	name: 'profile-preview',
	props: ['id'],
	computed: {
		$store: function () {
			return useData()
		},
		data: function () {
			return this.$store.getters.pdv('profile/fetch/' + this.id);
		},
		elections: function () {
			if (!this.data) return null;

			var res = [];
			
			this.data.cis.volby.forEach(x => {
				var o = {
					id: x.id,
					datum: x.datum
				}

				res.push(o);
			});

			res.sort((a, b) => (b.datum || '2099-12-31').localeCompare((a.datum || '2099-12-31'), 'cs'));

			return res;
		},
		photo: function () {
			if (!this.data) return null;

			var res = null;

			if (this.data.profile.$data.photo.length > 0) res = this.data.profile.$data.photo[0].value;

			this.elections.forEach(el => {
				this.data.list.filter(x => x.volby === el.id).forEach(item => {
					if (!res) {
						if (item.$data.photo.length > 0) res = item.$data.photo[0].value;
					}
				})
			});

			return res;
		},
		links: function () {
			if (!this.data) return null;

			var res = [];

			if (this.data.profile.$data.social.length > 0) res.push(this.data.profile.$data.social.forEach(x => res.push(x.value)));

			this.elections.forEach(el => {
				this.data.list.filter(x => x.volby === el.id).forEach(item => {
					// if (!res) {
						item.$data.social.forEach(x => {
							if (!res.find(y => y === x.value)) res.push(x.value);
						});
					// }
				})
			});

			return res;
		}
	},
	methods: {
		type, date
	}
};
