import {ga} from '@/pdv/analytics';
import {useData} from '@/stores/data';

export default {
	name: 'layout-homepage',
	data: function () {
		return {}
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
