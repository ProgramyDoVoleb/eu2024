import {useData} from '@/stores/data';
import { useCore, cdn, today } from '@/stores/core';
import elections from '@/stores/enums/elections';
import {url, date, number, truncate, domain, con, sortBy} from '@/pdv/helpers';
import { colorByItem, logoByItem } from '@/components/results/helpers';
import {ga} from '@/pdv/analytics';
import NewsItem from '@/components/news-item/do.vue'
import MailchimpSignup from '@/components/mailchimp/do.vue';
import ReportForm from '@/components/report-form/do.vue';
import ElectionPoll from '@/views/polls/poll/do.vue';
import NewsBlock from '@/components/news-block/do.vue'

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			cdn,
			today,
			selected: []
		}
	},
  components: {
	NewsItem, MailchimpSignup, ReportForm, ElectionPoll, NewsBlock
  },
	computed: {
		$store: function () {
			return useData()
		},
		core: function () {
			return useCore()
		},
		election_types: function () {
			return elections;
		},
		news: function () {
			return this.$store.getters.pdv('news/election/161');
		},
		elections: function () {
			return this.$store.getters.pdv('elections/fetch/161');
		},
		polls: function () {
			return this.$store.getters.pdv('polls/election/161');
		},
		parties: function () {
			return this.$store.getters.pdv('parties/1,5,7,47,53,166,1245,720,721,768,1114,1327');
		}
	},
  methods: {
		url,
		date,
		number,
		truncate,
		domain, 
		con,
		colorByItem,
		logoByItem,
		sortBy,
		filterMe: function (id) {
			if (this.selected.find(x => x === id)) {
				this.selected.splice(this.selected.findIndex(x => x === id), 1)
			} else {
				this.selected.push(id);
			}
		}
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga("Přehled kandidátů");
  }
};
