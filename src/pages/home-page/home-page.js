import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './home-styles.css?inline';
/* --- STYLES --- */

/* --- SERVICES --- */
/* --- SERVICES --- */

/* --- VIEWS --- */
import '../../views/type-view/type-view.js';
import '../../views/information-view/information-view.js';
import '../../views/customization-view/customization-view.js';
/* --- VIEWS --- */

/* --- COMPONENTS --- */
import '../../components/didieros-link-component/didieros-link-component.js';
/* --- COMPONENTS --- */

/* --- GSAP --- */
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
/* --- GSAP --- */

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class HomePage extends LitElement {
    static properties = {
        selectedType : { type: String },
        theme : { type: String },
    };

    constructor() {
        super();
        this.selectedType = 'aetherion';
        this.theme = '';
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ]

    async firstUpdated(){
        await this.updateComplete;
        this._animationReveal();
    }

    async firstUpdated() {

        await this.updateComplete;

        this._animateEntrance();
    }

    render() {
        return html`
            <main class="main-section general-section d-flexx d-col">
                <didieros-link-component ></didieros-link-component>
                <type-view class="reveal" @theme-selected=${this._themeChanged} @type-changed=${this._typeChanged}></type-view>
                <information-view class="reveal" .selectedType=${this.selectedType}></information-view>
                <customization-view class="reveal" .theme=${this.theme} .selectedType=${this.selectedType}></customization-view>
            </main>
        `;
    }

    _typeChanged(e) {
        this.selectedType = e.detail.type;
    }
    _themeChanged(e) {
        this.theme = e.detail.theme;
    }

    _animationReveal(){
        const container = this.renderRoot.querySelector('.cont-1');
        ScrollReveal({ reset: true });
        ScrollReveal().reveal(container, {
            delay: 500,
            distance: '20px',
            origin: 'bottom',
            duration: 1000

        });
    }

    _animateEntrance() {
        const containers = this.renderRoot.querySelectorAll('.reveal');
        gsap.from(containers, {
            opacity: 0,
            y: 40,
            scale: 0.90,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2
        });
    }
}
customElements.define('home-page', HomePage);