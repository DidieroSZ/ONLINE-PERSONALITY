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

/* --- MOTION --- */
import { animate, press, hover  } from "motion"
/* --- MOTION --- */

export class TypeComponent extends LitElement {
    static properties = {
        idType: { type: String},
        nameType: { type: String},
        checkedType: { type: Boolean},
    };

    constructor() {
        super();
        this.idType = '';
        this.nameType = '';
        this.checkedType = false;
    };

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    firstUpdated(){
        this._animationClick();
    }

    render() {
        return html`
            <label for="${this.idType}" class="type-btn">
                <input type="radio" hidden
                id="${this.idType}"
                name="${this.idType}" 
                value="${this.idType}"
                .checked=${this.checkedType}
                @change=${this._onChange}>
                <div class="inner-type-btn border d-flexx d-col">
                    <span class="trans">${unsafeHTML(icons[this.idType])}</span>
                    <p class="trans">${this.nameType}</p>
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

    _animationClick(){
        const btn = this.renderRoot.querySelector(".inner-type-btn");

        press(btn, (element) => {
            animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1500 })

            return () => {
                animate(element, { scale: 1 }, { type: "spring", stiffness: 200 })  
            };
        });
    }
    _animationHover(){
        const btn = this.renderRoot.querySelector(".type-btn");
        hover(btn, (element) => {
            animate(element, { scale: 1.3 });
            return () => animate(element, { scale: 1 });
        });
    }
}
customElements.define('type-component', TypeComponent);