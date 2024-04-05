import { cdn, data } from '@/stores/core';
import { domain, date } from '@/pdv/helpers';

export default {
	name: 'Photo',
	props: ['data', 'alt'],
	data: function () {
		return {
			detectedWidth: 10
		}
	},
	computed: {
		_src: function () {
			var l = this.data ? this.data.value : null;

			if (!l || l === "/static/missing.png") {
				if (!!this.missing) {
					return cdn + 'empty.png'; // https://data.programydovoleb.cz/obecne/strany/loga/missing.png
				} else {
					return cdn + 'missing.png';
				}				
			}

			return l;
		},
		_licence: function () {
			return this.data ? JSON.parse(this.data.label) : null;
		}
	},
	methods: {
		domain, date
	}
};
