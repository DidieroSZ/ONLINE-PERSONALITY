import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './config-component.css?inline';
/* --- STYLES --- */

/* --- ICONS --- */
import { icons } from '../../utils/icons.js'
/* --- ICONS --- */

export class ConfigComponent extends LitElement {
    static properties = {
        theme: { type: String }
    };

    constructor() {
        super();
        this.theme = localStorage.getItem('theme') || 'dark';
    };

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    connectedCallback() {
        super.connectedCallback();

        document.documentElement.setAttribute(
            'data-theme',
            this.theme
        );
    }

    render() {
        return html`
        <div class="config-component d-flexx d-col">
            <button class="btn-gen btn-secundary trans d-flexx"
                    @click=${this.toggleTheme}>
                    ${this.theme === 'dark' ? unsafeHTML(icons.moon) : unsafeHTML(icons.solgard)}
            </button>
            <button class="btn-gen btn-secundary trans d-flexx">${unsafeHTML(icons.languages)}</button>
        </div>
            
        `;
    }


    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', this.theme);

        this.dispatchEvent(new CustomEvent('theme-selected', {
            bubbles: true,
            composed: true,
            detail: { theme: this.theme }
        }));

        localStorage.setItem('theme', this.theme);
    }
}
customElements.define('config-component', ConfigComponent);