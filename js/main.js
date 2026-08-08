import Alpine from 'alpinejs'
import Chance from 'chance'

let chance;

Alpine.data('stats', () => ({
    /* data */
    data: {
        classes: [],
        quests: [],
        statusConditions: [],
        inventoryItems: []
    },

    /* app */
    seed: null,
    mode: 'dark',
    loading: true,
    loadingMessage: '',
    title: 'Daily Stats',

    /* stats */
    name: 'Unnamed Hero',
    level: 'Lv 30',
    className: '',
    hp: 0,
    sta: 0,
    lck: 0,
    quest: null,
    statusConditions: [],
    items: [],

    async init() {
        try {
            const res = await fetch('data/data.json');
            if (!res.ok) throw new Error(`Failed to load data (${res.status})`);
            this.data = await res.json();
            this.loading = false;
        } catch (err) {
            this.loadingMessage = 'Loading failed!';
        }

        this.parseParams();
        this.rollStats();
    },

    parseParams() {
        const params = new URLSearchParams(window.location.search)
        this.title = params.get('title') ?? this.title;
        this.name = params.get('name') ?? this.name;
        this.level = params.get('level') !== null ? `Lv ${params.get('level')}` : this.level;
        this.mode = params.get('mode') === 'dark' ? 'dark' : 'light';

        const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD, date only
        this.seed = this.hashString(`${this.name}|${this.level}|${today}`);
        chance = new Chance(this.seed);
    },

    rollStats() {
        

        this.className = chance.pickone(this.data.classes).name;
        this.quest = chance.pickone(this.data.quests);

        this.hp = chance.integer({ min: 1, max: 5 });
        this.sta = chance.integer({ min: 1, max: 5 });
        this.lck = chance.integer({ min: 1, max: 5 });

        this.statusConditions = chance.pickset(this.data.statusConditions, 2)
            .map(group => {
                const condition = chance.pickone(group)
                return {
                    ...condition,
                    value: chance.integer({ min: condition.range[0], max: condition.range[1] })
                }
            });

        this.items = chance.pickset(this.data.inventoryItems, 2)
            .map(item => ({
                ...item,
                value: chance.integer({ min: item.range.min, max: item.range.max })
            }));
    },

    hashString(str) {
        // FNV-1a hash — fast, deterministic, good distribution for seeding
        let hash = 0x811c9dc5
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i)
            hash = Math.imul(hash, 0x01000193)
        }
        return (hash >>> 0).toString(16) // unsigned hex string
    }
}))

Alpine.start()
