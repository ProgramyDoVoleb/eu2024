import {useEngagement} from '@/stores/engagement';

export default {
	name: 'EngagementQuiz1',
	data: function () {
		return {
			list: [
				{question: "Kolik europoslanců volíme v České republice?", options: [15,21,25,28], correct: 1, selected: null, comment: "Stejně jako v roce 2019 budeme volit 21 europoslanců."},
				{question: "Kolik kandidátů můžeme zakroužkovat?", options: ["žádného", 1, 2, 4], correct: 2, selected: null, comment: "V evropských volbách lze kroužkovat maximálně dva kandidáty. Pokud byste jich zakroužkovali víc, tak se budou kroužky ignorovat, ale hlas pro stranu bude nadále platný."},
				{question: "Můžeme vybrat kandidáty z více kandidátních listin?", options: ["ano", "ne"], correct: 1, selected: null, comment: "Tohle není možné. Jediné volby, kdy lze vybírat napříč kandidátními listinami, jsou komunální volby. U evropských voleb tak do volební obálky patří jen jedna kandidátní listina. ps: netrhat"},
				{question: "Můžeme v eurovolbách volit ze zahraničí?", options: ["ano", "ne"], correct: 1, selected: null, comment: "Není to možné. Pro eurovolby je nutné být na území České republiky. V zemích EU, pokud tam máte přechodný nebo trvalý pobyt a jste registrováni k volbám, pak můžete i tam - ale zároveň nemůžete v České republice, protože z místních seznamů jste vyškrtnuti."},
				{question: "Kolik europoslanců celkem za všechny členské země se letos volí?", options: [650, 701, 720, 751], correct: 2, selected: null, comment: "Evropský parlament letos volí 720 poslanců. Před brexitem to bylo 751, nyní po odchodu Velké Británie jich je 701. Oněch 19 nových míst bylo rozděleno mezi země, Česká republika nezískala žádný mandát navíc, Slovensku ano."},
				{question: "Může u nás volit občan jiného členského státu EU?", options: ["ano, pokud je na seznamu voličů", "ano, stačí přijít s potvrzením o pobytu", "ano, stačí přijít s občankou", "ne"], correct: 0, selected: null, comment: "Občané jiných zemí EU u nás mohou v eurovolbách hlasovat, pokud zde mají trvalý nebo přechodný pohyb a jsou zapsaní na speciálním seznamu voličů."},
				{question: "Kdy nejdříve se dozvíme výsledky?", options: ["v sobotu po 14:00", "v sobotu po 22:00", "v neděli po 22:00", "v pondělí po 12:00"], correct: 2, selected: null, comment: "Eurovolby jsou speciální, na výsledky se mnusí počkat až do uzavření všech místností v celé Evropské unii v neděli ve 22:00. Ihned poté mohou být výsledky zveřejněné."},
				{question: "Kolik stran, hnutí nebo koalic jde do voleb?", options: [20, 28, 30, 39], correct: 2, selected: null, comment: "Letos jde do eurovoleb 30 uskupení, najdete je <a href='/prehled'>v přehledu</a>. Mnoho stran jde letos v koalici, takže pokud byste hledali konkrétní stranu, pak všechny strany, které někoho nominovaly nebo jejichž člen někam kandiduje, <a href='/strany'>najdete v tomto seznamu</a>."},
				{question: "Volit může každý občan ČR, kterému bylo ...", options: ["16 let druhý den voleb", "18 let první den voleb", "18 let druhý den voleb", "21 let druhý den voleb"], correct: 2, selected: null, comment: "Obecným pravidlem je, že podmínku věku je nutné splňovat v druhý den voleb, tedy v sobotu, což platí jak pro voliče, tak pro kandidáty. Volit pak může každý, komu je alespoň 18 let."},
				{question: "Lze požádat o voličský průkaz na Portálu občana?", options: ["ano, do 24. května", "ano, do 31. května", "ano, do 5. června", "ne, jen osobně"], correct: 1, selected: null, comment: "O voličský průkaz lze požádat na Portálu občana do 31. května do 16:00 <a href='https://gov.cz/kam-dal/volicsky-prukaz-2024-online' target='_blank'>přímo zde</a>"},
			],
			sent: false
		}
	},
	components: {},
	computed: {
		engagement: function () {
			return useEngagement();
		},
		used: function () {
			return this.engagement.used(this.$route.fullPath, 'eu24-quiz-1');
		},
		result: function () {
			var o = {
				completed: !this.list.find(x => typeof x.selected === null),
				correct: this.list.reduce((a, b) => a + (b.correct === b.selected ? 1 : 0), 0),
				answers: this.list.map(x => x.selected)
			}

			return o;
		}
	},
	methods: {
		click: function () {
			this.engagement.add(this.$route.fullPath, 'eu24-quiz-1', JSON.stringify(this.result), 'Odesílám výsledky');
			window.scrollTo(0, 1);
		}
	}
}