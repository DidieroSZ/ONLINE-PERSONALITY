import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './customization-view.css?inline';
/* --- STYLES --- */

/* --- COMPONENTS --- */
/* import '../../components/type-component/type-component.js'; */
/* --- COMPONENTS --- */

import { chance } from 'chance';

/* --- ICONS --- */
import { icons } from '../../utils/icons.js'
/* --- ICONS --- */

/* --- UTILS --- */
import { fantasyRealms } from '../../utils/fantasy-realms.js'
/* --- UTILS --- */

export class CustomizationView extends LitElement {
    static properties = {
        selectedType : { type: String },
        generatedName : { type: String },
        character: { type: Object },
        parseado: { type: Boolean }
    };

    constructor() {
        super();
        this.selectedType ='aetherion';
        this.generatedName ='BABY HELLO';
        this.character = {};
        this.parseado = false;
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    firstUpdated(){
        /* this._generateName(); */
    }

    render() {
        return html`
            <section class="general-section container-styled customization-container d-flexx d-col">
                ${this._renderCharacter()}
                <div class="btns-container d-flexx d-row">
                    <button @click=${this._generateName} class="btn-gen btn-primary d-flexx trans">${unsafeHTML(icons.repeat)} Regenerate</button>
                    <button class="btn-gen btn-secundary d-flexx trans">${unsafeHTML(icons.copy)} Copy</button>
                    <button class="btn-gen btn-secundary d-flexx trans">${unsafeHTML(icons.save)} Save</button>
                </div>
            </section>
        `;
    }

    async _generateName(){
        const chance = new Chance();
        let n = chance.word({ syllables: 3 });
        let a = chance.word({ syllables: 4 });
        this.generatedName = n + ' ' + a;

        const response = await fetch('https://set.world/api/roll/character');
        this.character = await response.json();
        this.parseado = true;
    }

    _renderCharacter(){
        if (!this.parseado) {

            return html`
                <article class="container-styled first-container d-flexx d-col">
                    <p>Loading...</p>
                </article>
            `;
        }

        return html`
            <article class="container-styled display-container d-flexx d-row">
                <div class="item-display player-info d-flexx d-col">
                    <span class="banner-player d-flexx"></span>
                    <h3>  ${this.generatedName} </h3>
                    <div class="basic-info d-flexx d-row">
                        <span class="labels btn-gen btn-primary level">LVL: ${this.character.stats.level}</span>
                        <span class="labels btn-gen ">PWR: 1452/1808</span>
                        <span class="labels btn-gen ">Class: ${this.character.class.name}</span>
                    </div>
                    <p>${this.character.class.flavor}.</p>
                </div>
                <div class="item-display player-stats">
                </div>
            </article>
        `;        
    }
}
customElements.define('customization-view', CustomizationView);