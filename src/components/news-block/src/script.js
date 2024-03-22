import {url, date, domain, unique} from '@/pdv/helpers';
import NewsItem from '@/components/news-item/do.vue'
import LogItem from '@/components/log-item/do.vue';
import logtypes from '@/stores/enums/log';

export default {
	name: 'NewsBlock',
	props: ['news', 'limit', 'data'],
	methods: {
		url, date, domain
	},
	components: {
		NewsItem, LogItem
	},
	computed: {
		enums: function () {
			return {logtypes}
		},
		consolidatedNews: function () {
			var list = [];

			if (this.news) {
				var datelist = [];

				this.news.list.forEach(x => datelist.push(x));
				this.news.auto.forEach(x => datelist.push(x));
				this.news.log.forEach(x => datelist.push(x));

				datelist.forEach(x => x.datum = x.date || x.datum);

				var dates = unique(datelist, 'datum');

				dates.forEach(datum => {
					var o = {
						datum,
						list: this.news.list.filter(x => x.datum === datum),
						auto: this.news.auto.filter(x => x.datum === datum),
						log: this.news.log.filter(x => x.date === datum && !x.node),
						log2: this.news.log.filter(x => x.date === datum && x.node)
					}

					list.push(o);
				})
			}

			list.sort((a, b) => b.datum.localeCompare(a.datum, 'cs'));

			return list;
		}
	}
};
