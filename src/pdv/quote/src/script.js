export default {
	name: 'p-quote',
	props: ['color', 'size', 'source', 'date'],
	mounted: function () {
		setTimeout(() => {
			if (this.$el.innerText.length > 0) {
				this.$el.classList.add('_long');
			}
		}, 10);
	}
};
