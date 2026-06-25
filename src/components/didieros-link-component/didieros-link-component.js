import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './didieros-link-component.css?inline';
/* --- STYLES --- */

/* --- ICONS --- */
import { icons } from '../../utils/icons.js'
/* --- ICONS --- */

export class DidierosLinkComponent extends LitElement {
    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    render() {
        return html`
            <a class="link-didieros cursive-font" href="https://didierosz.github.io/DIDIER.github.io/" target="_blank" title="Didieros Portfolio">
                Didier Saucedo
            </a>
        `;
    };
}
customElements.define('didieros-link-component', DidierosLinkComponent);