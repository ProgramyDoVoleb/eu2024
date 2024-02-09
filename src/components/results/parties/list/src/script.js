import { cdn } from '@/stores/core';
import { sortByPorCislo } from '@/pdv/helpers';

export default {
	name: 'results-parties-list',
	props: ['list'],
	data: function () {
		return {
			cdn
		}
	},
	methods: {
		sortByPorCislo
	}
};
