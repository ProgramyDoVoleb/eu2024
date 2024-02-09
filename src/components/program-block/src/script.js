export default {
	name: 'program-block',
	props: ['parts', 'depth', 'color'],
	computed: {
		data: function () {
			var list = [];

			var parts = this.parts;

			if (parts) {

				if (typeof parts === 'string' || !parts.length) {
					parts = [this.parts];
				}

				if (parts.source) {
					list.push({
						type: 'source',
						content: parts.source
					});
				}

				parts.forEach(item => {
					if (typeof item === 'string') {
						list.push({
							type: 'copy',
							content: item
						});
					} else if (typeof item === 'object' && item.length) {
						list.push({
							type: 'list',
							parts: item
						})
					} else if (typeof item === 'object' && !item.length && !item.type) {
						list.push({
							type: 'block',
							parts: item
						})
					} else {
						list.push(item);
					}
				});
			}

			return list;
		}
	}
};
