import {ga} from '@/pdv/analytics';
import { cdn } from '@/stores/core';
import Quiz1 from '@/components/engagement/poll/do.vue'

export default {
	name: 'layout-activity-quiz1',
	data: function () {
		return {
			cdn
		}
	},
  components: {
	Quiz1
  },
  mounted: function () {
    window.scrollTo(0, 1);
    ga("Kvíz k eurovolbám");
  }
};
