import {ga} from '@/pdv/analytics';
import {useData} from '@/stores/data';
import { cdn } from '@/stores/core';

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			cdn
		}
	},
  components: {},
	computed: {
		$store: function () {
			return useData()
		},
		elections: function () {
			return this.$store.getters.pdv('elections/fetch/161');
		}
	},
  methods: {
	},
  mounted: function () {
    window.scrollTo(0, 0);
    ga("Otázky pro strany a kandidáty");
  }
};
