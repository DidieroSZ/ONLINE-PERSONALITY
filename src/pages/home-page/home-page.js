import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './home-styles.css?inline';
/* --- STYLES --- */

/* --- SERVICES --- */
/* --- SERVICES --- */

/* --- COMPONENTS --- */
import '../../views/type-view/type-view.js';
/* --- COMPONENTS --- */

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class HomePage extends LitElement {
    static properties = {
        count: { type: Number},
    };

    constructor() {
        super();
        this.count = 0;
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ]

    render() {
        return html`
            <main class="main-section general-section d-flexx d-col">
                <type-view></type-view>
            </main>
        `;
    }
}
customElements.define('home-page', HomePage);