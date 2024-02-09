import { useCore } from '@/stores/core';
import MainHeader from '@/components/header/do.vue';
import MainFooter from '@/components/footer/do.vue';

export default {
	name: 'app',
    data: function () {
      return {
        core: useCore()
      }
    },
    components: {
      MainHeader,
      MainFooter
    },
    computed: {

    },
    methods: {
    },
    mounted: function () {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				this.core.change(true);
			}
    }
};
