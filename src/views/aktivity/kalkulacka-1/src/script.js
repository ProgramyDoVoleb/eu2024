import {ga} from '@/pdv/analytics';
import { cdn } from '@/stores/core';
import Calc1 from '@/components/engagement/calc-1/do.vue'

export default {
	name: 'layout-activity-poll1',
	data: function () {
		return {
			cdn
		}
	},
  components: {
	Calc1
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga("Volební kalkulačka");
  }
};
