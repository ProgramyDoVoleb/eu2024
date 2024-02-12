export default {
	name: 'loader-element',
	props: ['type', 'rule', 'height', 'width', 'reserve'],
	data: function () {
		return {}
	},
	computed: {
		_w: function () {
			return this.width || 3;
		},
		_r: function () {
			return this.reserve || '200px'
		}
	},
	methods: {},
	mounted: function () {}
};
