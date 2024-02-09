import {truncate} from '@/pdv/helpers';

export default {
	name: 'TruncatedText',
	props: ['content', 'compact', 'size'],
	data: function () {
		return {
			full: false,
			hideable: false,
			truncated: undefined
		}
	},
	computed: {
		txt: function () {
			if (this.hideable) {
				if (this.full) {
					return this.content;
				} else {
					return this.truncated;
				}
			} else {
				return this.content;
			}
		}
	},
	methods: {
		test: function () {
			this.truncated = truncate(this.content, this.size || (typeof this.compact != "undefined" ? 30 : 120));
			if (this.truncated && this.truncated.length != this.content.length) this.hideable = true;
		},
		changeText: function () {
			if (this.full) {
				this.full = false;
				setTimeout(() => {
					this.$el.scrollIntoView({behavior: "smooth", block: "center"});
				}, 100);
			} else {
				this.full = true;
			}
		}
	},
	mounted: function () {
		this.test();
	},
	watch: {
		content: function () {
			this.test();
		}
	}
};
