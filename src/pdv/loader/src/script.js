export default {
	name: 'loader-element',
	props: ['type', 'rule', 'height', 'width', 'reserve'],
	data: function () {
		return {}
	},
	computed: {
		_w: function () {
			return this.width || 3;
		}
	},
	methods: {},
	mounted: function () {}
};
