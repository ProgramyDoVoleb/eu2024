import {ga} from '@/pdv/analytics';

export default {
	name: 'layout-homepage',
	data: function () {
		return {}
	},
  components: {},
	computed: {
	},
  methods: {
	},
  mounted: function () {
    window.scrollTo(0, 0);
    ga("O projektu Programy do voleb");
		
		setTimeout(() => {
			if (location.hash != '') {
				this.$el.querySelector("a[name=" + location.hash.split('#')[1] + "]").scrollIntoView({behavior: "smooth", block: "center"});
			}
		}, 500);
  }
};
