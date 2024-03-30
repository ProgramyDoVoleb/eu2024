import {url, date, domain} from '@/pdv/helpers';
import { colorByItem, logoByItem } from '@/components/results/helpers';

export default {
	name: 'EventItem',
	props: ['item', 'party', 'data', 'noTag'],
	methods: {
		url, date, domain, colorByItem
	}
};
