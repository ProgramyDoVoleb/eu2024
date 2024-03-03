import copy from 'copy-to-clipboard';
import {ge} from '@/pdv/analytics'

export default {
	name: 'share-block',
	props: ['copy', 'title', 'middle', 'link'],
	data: function () {
		return {
			copied: false,
			_backupCopy: 'Podívejte se na web k evropským volbám od Programů do voleb'
		}
	},
	computed: {
		path: function () {
			return 'https://' + window.location.hostname + (this.link || this.$route.fullPath.split('#')[0]);
		}
	},
	methods: {
		copyLink: function () {
			copy(this.path);
			this.copied = true;

			ge({
				action: "copy",
				category: "share",
				label: this.$route.fullPath
			});

			setTimeout(() => this.copied = false, 1000);
		}
	}
};
