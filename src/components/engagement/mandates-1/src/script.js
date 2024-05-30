import { useEngagement } from '@/stores/engagement';
import { useData } from '@/stores/data';
import { round, date, con, sortBy } from '@/pdv/helpers';
import hotshots from '@/components/engagement/mandates-1/src/hotshots';
import html2canvas from 'html2canvas'

export default {
	name: 'EngagementPoll',
	props: ['data'],
	data: function () {
		return {
			hotshots,
			form: {
				datum: new Date().toISOString(),
				name: null,
				answers: []
			},
			sent: false
		}
	},
	components: {
	},
	computed: {
		$store: function () {
			return useData()
		},
		elections: function () {
			return this.$store.getters.pdv('elections/fetch/161');
		},
		engagement: function () {
			return useEngagement();
		},
		used: function () {
			return this.engagement.used(null, 'eu24-mandates-1');
		},
		list: function () {
			var arr = [];

			this.form.answers.forEach(id => {
				arr.push(this.elections.list[0].$kandidati.find(x => x.id === id))
			});

			return sortBy(sortBy(arr, 'PRIJMENI', null, true), 'ESTRANA');
		}
	},
	methods: {
		round, date, con,
		submit: function () {
			this.engagement.add(this.$route.fullPath, 'eu24-mandates-1', JSON.stringify(this.form), 'Posílám tip');
			window.scrollTo(0, 1);
		},
		toggle: function (id) {
			if (this.form.answers.find(x => x === id)) {
				this.form.answers.splice(this.form.answers.findIndex(x => x === id), 1);
			} else {
				this.form.answers.push(id);
			}
		},
		snapshot: function (ev) {
			setTimeout(() => {
				html2canvas(this.$el.querySelector('._area'),{
					allowTaint: true,
					useCORS : true,
				}).then((canvas) => {
					this.$refs.canvas.appendChild(canvas);
					this.imagedata = canvas.toDataURL("image/png");
		
					canvas.style.width = '100%';
					canvas.style['max-width'] = canvas.width + 'px';
					canvas.style.height = 'auto';
				})
			}, 500);
		},
	}
};
