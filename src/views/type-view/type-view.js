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

/* --- UTILS --- */
import { fantasyRealms } from '../../utils/fantasy-realms.js'
/* --- UTILS --- */

import ScrollReveal from 'scrollreveal';

export class TypeView extends LitElement {
    static properties = {
        selectedType : { type: String },
    };

    constructor() {
        super();
        this.selectedType ='aetherion';
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    render() {
        return html`
            <section class="general-section type-container container-styled d-flexx d-col">
                <div class="header-type-container d-flexx d-row">
                    <p>Choose your vibe</p>
                </div>
                <div class="footer-type-container d-flexx d-row">
                    ${this._renderOptions()}
                </div>
            </section>
        `;
    }

    _renderOptions(){
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
        this._eventChanged();
    }

    _eventChanged() {
        this.dispatchEvent(new CustomEvent('type-changed', {
            bubbles: true,
            composed: true,
            detail: { type: this.selectedType }
        }));
    }
}
customElements.define('type-view', TypeView);