import {useData} from '@/stores/data';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import { type, domain, date, truncate } from '@/pdv/helpers';
import { useCore, cdn } from '@/stores/core';
import ReportForm from '@/components/report-form/do.vue';

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
	components: {
		ReportForm
	},
	methods: {
		colorByItem, logoByItem, date, truncate, type,
		sortByPorCislo: function (list) {
			var arr = [];

			list.forEach(x => arr.push(x));

			arr.sort((a, b) => (a.PORCISLO || 1000) - (b.PORCISLO || 1000));

			return arr;
		}
	}
};
