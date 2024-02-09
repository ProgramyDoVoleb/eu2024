import { cdn } from '@/stores/core';
import { sortByPorCislo, date } from '@/pdv/helpers';

export default {
	name: 'results-parties-grid',
	props: ['list', 'leaders'],
	data: function () {
		return {
			cdn
		}
	},
	methods: {
		sortByPorCislo, date
	}
};
