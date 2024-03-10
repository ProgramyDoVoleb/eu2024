import {ga} from '@/pdv/analytics';
import { useCore, cdn, today } from '@/stores/core';

export default {
	name: 'layout-homepage',
	data: function () {
		return {
			cdn
		}
	},
  components: {},
	computed: {
	},
  methods: {
	},
  mounted: function () {
    window.scrollTo(0, 0);
    ga("Pro strany a kandidáty");
		
		setTimeout(() => {
			if (location.hash != '') {
				this.$el.querySelector("[name=" + location.hash.split('#')[1] + "]").scrollIntoView({behavior: "smooth", block: "center"});
			}
		}, 500);
  }
};
