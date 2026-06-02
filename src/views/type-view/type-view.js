import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './type-view.css?inline';
/* --- STYLES --- */

/* --- COMPONENTS --- */
import '../../components/type-component/type-component.js';
/* --- COMPONENTS --- */

export class TypeView extends LitElement {
    static properties = {
        selectedType : { type: String },
    };

    constructor() {
        super();
        this.selectedType ='';
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ]

    render() {
        return html`
            <section class="general-section type-container container-styled d-flexx d-col">
                <div class="header-type-container d-flexx d-row">
                    <p>Choose your vibe</p>
                    <button class="btn-gen btn-lowKey">Surprise me</button>
                </div>
                <div class="footer-type-container d-flexx d-row">
                    ${this._renderOptions()}
                </div>
            </section>
        `;
    }

    _renderOptions(){
        const fantasyRealms = [
            {
                id: 'aetherion',
                name: 'Aetherion',
                description: 'A celestial kingdom floating above the clouds, ruled by ancient star mages and guardians of cosmic balance.'
            },
            {
                id: 'drakmor',
                name: 'Drakmor',
                description: 'A volcanic empire forged by dragon riders, where fire and steel shape the destiny of warriors.'
            },
            {
                id: 'eldervale',
                name: 'Eldervale',
                description: 'An enchanted forest realm filled with immortal elves, glowing rivers, and forgotten magic.'
            },
            {
                id: 'nocthyr',
                name: 'Nocthyr',
                description: 'A shadow kingdom hidden beneath eternal night, home to assassins, vampires, and moon priests.'
            },
            {
                id: 'solgard',
                name: 'Solgard',
                description: 'A radiant golden kingdom devoted to honor, light, and powerful solar knights.'
            },
            {
                id: 'frosthelm',
                name: 'Frosthelm',
                description: 'A frozen northern realm where giant beasts roam icy mountains and clans battle for survival.'
            },
            {
                id: 'nymeris',
                name: 'Nymeris',
                description: 'A mysterious oceanic kingdom built across coral cities and guarded by ancient sea spirits.'
            },
            {
                id: 'grimHollow',
                name: 'Grimhollow',
                icon: 'skull',
                description: 'A cursed land consumed by dark sorcery, haunted ruins, and creatures born from nightmares.'
            },
            {
                id: 'thornreach',
                name: 'Thornreach',
                description: 'A wild overgrown realm where nature has reclaimed forgotten castles and beastfolk tribes thrive.'
            },
            {
                id: 'zephyria',
                name: 'Zephyria',
                description: 'A kingdom of floating islands powered by wind crystals and sky pirates sailing the endless heavens.'
            }
        ];

        return fantasyRealms.map(type => html`
            <type-component
                .idType=${type.id}
                .nameType=${type.name}
                .checkedType=${this.selectedType === type.id}
                @type-selected=${this._changeType}>
            </type-component>
        `); 
    }

    _changeType(e){
        this.selectedType = e.detail.type;
    }
}
customElements.define('type-view', TypeView);