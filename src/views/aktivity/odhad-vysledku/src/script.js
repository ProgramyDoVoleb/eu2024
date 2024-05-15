import { useCore, cdn, today } from '@/stores/core';
import {useData} from '@/stores/data';
import {ga} from '@/pdv/analytics';
import ResultGuess from '@/components/engagement/result-tip/do.vue'

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			cdn
		}
	},
  components: {
	ResultGuess
  },
	computed: {
		$store: function () {
			return useData()
		},
		elections: function () {
			return this.$store.getters.pdv('elections/fetch/161');
		},
	},
  methods: {
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga("Odhad výsledku");
  }
};
