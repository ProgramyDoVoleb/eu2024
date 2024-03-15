import { colorByItem, logoByItem } from '@/components/results/helpers';
import { con, type } from '@/pdv/helpers';
import { cdn } from '@/stores/core';

export default {
	name: 'person-preview-linear',
	props: ['cand', 'data', 'current'],
	data: function () {
		return {
			cdn
		}
	},
	computed: {

	},
	methods: {
		colorByItem, logoByItem, con, type,
		checkDuplicates: function (list) {
			var arr = [];

			list.forEach(x => {
				if (!arr.find(y => y.value === x.value)) arr.push(x);
			});

			return arr;
		},
	}
};
