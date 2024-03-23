export default {
	name: 'p-loader',
	props: ['rule', 'reserve'],
	computed: {
		_r: function () {
			return this.reserve || '200px'
		}
	}
};
