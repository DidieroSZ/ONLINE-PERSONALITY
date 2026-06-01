import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './type-component.css?inline';
/* --- STYLES --- */

/* --- ICONS --- */
import { icons } from '../../utils/icons.js'
/* --- ICONS --- */

export class TypeComponent extends LitElement {
    static properties = {
        idType: { type: String},
        iconType: { type: String},
        nameType: { type: String},
        checkedType: { type: Boolean},
    };

    constructor() {
        super();
        this.idType = 'icon';
        this.iconType = 'icon';
        this.nameType = 'Bannano';
        this.checkedType = false;
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ]

    render() {
        return html`
            <label for="${this.idType}" class="type-btn">
                <input type="radio" hidden
                id="${this.idType}"
                name="${this.idType}" 
                value="${this.idType}"
                .checked=${this.checkedType}
                @change=${this._onChange}>
                <div class="inner-type-btn border d-flexx d-col trans">
                    <span>${unsafeHTML(icons[this.iconType])}</span>
                    <p>${this.nameType}</p>
                </div>
            </label>
        `;
    }

    _onChange() {
        this.dispatchEvent(new CustomEvent('type-selected', {
            bubbles: true,
            composed: true,
            detail: { type: this.idType }
        }));
    }

}
customElements.define('type-component', TypeComponent);