
import EvropskeVolby from '@/views/volby/evropske-volby/do.vue'
import { useData } from '@/stores/data';
import { cdn, today } from '@/stores/core';
import { date } from '@/pdv/helpers';

export default {
	name: 'layout-obec-volby-detail',
	props: ['id', 'type', 'local', 'label', 'election', 'spec'],
	data: function () {
		return {
			cdn, today,
			hash: 'detail-volby'
		}
	},
  components: {
	EvropskeVolby
  },
	computed: {
		$store: function () {
			return useData()
		},
		data: function () {
			return this.$store.getters.pdv("elections/fetch/" + this.id); 
		}
	},
	methods: {
		date
	}
};
