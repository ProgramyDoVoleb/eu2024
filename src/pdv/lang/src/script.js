import {number} from '@/pdv/helpers';

export default {
	name: 'Lang',
	props: ['end', 'value'],
	computed: {
		ending: function () {
			var s;

			var end = ['', '', '', ''];

			if (this.end && this.end.sort) {
				this.end.forEach((x, i) => end[i] = x);
			}

			if (this.value === 0) s = end[0];
			if (this.value === 1) s = end[1];
			if (this.value > 1 && this.value < 5) s = end[2];
			if (this.value > 4) s = end[3];

			return s;
		}
	},
	methods: {
		number
	}
};
