import {url, date, domain} from '@/pdv/helpers';

export default {
	name: 'NewsItem',
	props: ['data', 'direct', 'noSource'],
	methods: {
		url, date, domain
	}
};
