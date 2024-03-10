import {useData} from '@/stores/data';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import { type, domain } from '@/pdv/helpers';
import { useCore, cdn } from '@/stores/core';

export default {
	name: 'party-preview',
	props: ['party', 'elections', 'election'],
	data: function () {
		return {
			cdn
		}
	},
	computed: {

	},
	methods: {
		colorByItem, logoByItem,
		sortByPorCislo: function (list) {
			list.sort((a, b) => (a.PORCISLO || 1000) - (b.PORCISLO || 1000));

			return list;
		}
	}
};
