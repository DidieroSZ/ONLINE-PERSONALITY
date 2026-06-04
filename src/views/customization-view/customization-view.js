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
    };

    constructor() {
        super();
        this.selectedType ='aetherion';
        this.generatedName ='';
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    firstUpdated(){
        this._generateName()
    }

    render() {
        return html`
            <section class="general-section container-styled customization-container d-flexx d-col">
                <article class="container-styled display-container">
                    <h3>${ this.generatedName }</h3>
                    <p>Zephyria floats among endless skies, powered by mysterious wind crystals. Merchants, explorers, and sky pirates navigate between airborne islands.</p>
                </article>
                <div class="btns-container d-flexx d-row">
                    <button @click=${this._generateName} class="btn-gen btn-primary d-flexx trans">${unsafeHTML(icons.repeat)} Regenerate</button>
                    <button class="btn-gen btn-secundary d-flexx trans">${unsafeHTML(icons.copy)} Copy</button>
                    <button class="btn-gen btn-secundary d-flexx trans">${unsafeHTML(icons.save)} Save</button>
                </div>
            </section>
        `;
    }

    _generateName(){
        const chance = new Chance();
        let n = chance.word({ syllables: 3 });
        let a = chance.word({ syllables: 4 });
        this.generatedName = n + ' ' + a;
    }
}
customElements.define('customization-view', CustomizationView);