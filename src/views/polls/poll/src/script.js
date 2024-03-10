import {cdn} from '@/stores/core';
import {number, pct, reverse, round, date} from '@/pdv/helpers';
import { colorByItem } from '@/components/results/helpers';
import html2canvas from 'html2canvas'

export default {
	name: 'volby-poll',
	props: ['data'],
	data: function () {
		return {
			cdn,
			imagedata: null
		}
	},
	computed: {
		dhondt: function () {
			var list = [];

			this.data.entries.forEach(x => {
				var o = {
					data: x,
					party: x.party,
					value: x.value,
					mandates: 0
				}

				list.push(o);
			});

			this.dhondtCalculate(list, 21);

			return list;
		}
	},
	methods: {
		pct, number, reverse, round, colorByItem, date,
		dhondtCalculate: function (list, mandates) {
			var arr = [];

			if (list.length === 1) {
				list[0].mandates = 21;
			} else {
				list.filter(x => x.value >= 5).forEach(item => {
					for (var i = 1; i < mandates; i++) {
						arr.push({
							value: item.value / i,
							item
						});
					}
				})
	
				arr.sort((a, b) => b.value - a.value);
				arr.splice(mandates, arr.length - mandates);
	
				list.forEach(item => {
					item.mandates = arr.filter(x => x.item.party === item.party).length;
				});
			}
		},
		snapshot: function (ev) {
			html2canvas(this.$el.querySelector('._area')).then((canvas) => {
				this.$refs.canvas.appendChild(canvas);
				this.imagedata = canvas.toDataURL("image/png");

				canvas.style.width = '100%';
				canvas.style['max-width'] = canvas.width + 'px';
				canvas.style.height = 'auto';
			})
		}
	}
};
