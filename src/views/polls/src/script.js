import GraphParties from '@/views/polls/poll/do.vue';
import PollOfPolls from '@/views/polls/pollofpolls/do.vue';
import PollsPreview from '@/components/polls-preview/do.vue';
import {cdn} from '@/stores/core';
import {useData} from '@/stores/data';
import {ga} from '@/pdv/analytics';

import {date, number, color, indicator} from '@/pdv/helpers';

export default {
	name: 'layout-polls',
	data: function () {
		return {
			cdn,
			type: 1,
			pollCoalitions: false
		}
	},
  components: {
	GraphParties, PollOfPolls, PollsPreview
  },
	computed: {
		$store: function () {
			return useData()
		},
		polls: function () {
			var p = this.$store.getters.pdv('polls/election/161');

			if (!p) return null;

			var list = [];

			p.list.forEach(poll => {
				poll.mid = new Date((new Date(poll.to || poll.datum).getTime() + new Date(poll.from || poll.datum).getTime()) / 2);
				list.push(poll);
			});

			list.sort((a, b) => b.mid - a.mid);

			return {list};
		}
	},
  methods: {
	date, number, color, indicator
  },
  mounted: function () {
    window.scrollTo(0, 0);
    // this.$store.dispatch("ga", {title: "Přehled volebních průzkumů"});
	ga("Přehled volebních průzkumů");
  }
};
