import {useData} from '@/stores/data';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import { type, domain, date } from '@/pdv/helpers';
import { useCore, cdn } from '@/stores/core';
import ReportForm from '@/components/report-form/do.vue';

export default {
	name: 'party-preview',
	props: ['party', 'candidates', 'elections', 'election', 'label'],
	data: function () {
		return {
			cdn
		}
	},
	components: {
		ReportForm
	},
	computed: {

	},
	methods: {
		colorByItem, logoByItem, date,
		sortByPorCislo: function (list) {
			var arr = [];

			list.forEach(x => arr.push(x));

			arr.sort((a, b) => (a.PORCISLO || 1000) - (b.PORCISLO || 1000));

			// console.log(list, arr);

			return arr;
		}
	}
};
