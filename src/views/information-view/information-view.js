import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './information-view.css?inline';
/* --- STYLES --- */

/* --- COMPONENTS --- */
/* import '../../components/type-component/type-component.js'; */
/* --- COMPONENTS --- */

/* --- ICONS --- */
import { icons } from '../../utils/icons.js'
/* --- ICONS --- */

export class InformationView extends LitElement {
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
            <section class="general-section information-container container-styled d-flexx d-col">
                <div class="header-information">
                    <span class="btn-gen btn-primary">${unsafeHTML(icons.nocthyr)} Nocthyr</span>
                </div>
            </section>
        `;
    }

}
customElements.define('information-view', InformationView);