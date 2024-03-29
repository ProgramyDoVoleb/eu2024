import {useData} from '@/stores/data';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import { type, domain, date } from '@/pdv/helpers';
import { useCore, cdn } from '@/stores/core';

export default {
	name: 'party-preview',
	props: ['party', 'candidates', 'elections', 'election'],
	data: function () {
		return {
			cdn
		}
	},
	computed: {

	},
	methods: {
		colorByItem, logoByItem, date,
		sortByPorCislo: function (list) {
			var arr = [];

			list.forEach(x => arr.push(x));

			arr.sort((a, b) => (a.PORCISLO || 1000) - (b.PORCISLO || 1000));

			return list;
		}
	}
};
