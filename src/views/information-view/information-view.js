import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { keyed } from 'lit/directives/keyed.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './information-view.css?inline';
/* --- STYLES --- */

/* --- ICONS --- */
import { icons } from '../../utils/icons.js'
/* --- ICONS --- */

/* --- UTILS --- */
import { fantasyRealms } from '../../utils/fantasy-realms.js'
/* --- UTILS --- */

/* --- GSAP --- */
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
/* --- GSAP --- */

export class InformationView extends LitElement {
    static properties = {
        selectedType : { type: String },
    };

    constructor() {
        super();
        this.selectedType ='aetherion';
    };

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    async updated(changedProperties){
        if (changedProperties.has('selectedType')) {
            await this.updateComplete;
            this._animationHeight();
        }
    };

    render() {
        return html`
            <section class="general-section information-container container-styled d-flexx d-col">
                ${this._renderInformation()}
            </section>
        `;
    };

    /* ---- RENDER FUNCTIONS ---- */
    _renderInformation(){
        let filterred = fantasyRealms.filter( t => t.id === this.selectedType);
        
        return filterred.map(t => keyed(t.id, html`
            <div class="header-information d-flexx d-row">
                    <span class="btn-gen btn-primary">${unsafeHTML(icons[t.id])} ${t.name}</span>
                    <div class="labels d-flexx d-row">
                        <small class="label-general btn-gen"><p>population:</p> ${ new Intl.NumberFormat().format(t.population) }</small>
                        <small class="label-general btn-gen"><p>extension:</p> ${ new Intl.NumberFormat().format(t.territoryKm2) }</small>
                    </div>
                </div>
                <article class="main-information d-flexx d-col">
                    <h2 class="less-cursive-font">${t.capital}</h2>
                    <div class="info-places d-flexx d-row">
                        <small class="label-general">LAT: ${t.latitude}</small>
                        <small class="label-general">LONG: ${t.longitude}</small>
                    </div>
                    <p class="description" aria-label="${t.description} ${t.lore}">${t.description} ${t.lore}</p>
                    <div class="colors d-flexx d-row">
                        <span class="item border" style="background-color: ${t.colors[0]};"></span>
                        <span class="item border" style="background-color: ${t.colors[1]};"></span>
                        <span class="item border" style="background-color: ${t.colors[2]};"></span>
                    </div>
                </article>
                <div class="footer-information border">
                    <p>SIGNATURE "${t.motto}"</p>
                </div>
        `)); 
    }
    /* ----END RENDER FUNCTIONS ---- */

    /* ---- ANIMATION FUNCTIONS ---- */
    _animateTexts(){
        gsap.registerPlugin(SplitText);

        const description = this.renderRoot.querySelector(".description");
        let splitInstance  = SplitText.create(description, { type: "words, chars" });

        gsap.from(splitInstance.words, {
            duration: 0.05,
            y: 20,
            autoAlpha: 0, 
            stagger:{
                amount: 1,
                from: "start",
            },
            onComplete: () => {
                splitInstance.revert()
            },
        });
    }

    _animationHeight(){
        const mainContainer = this.renderRoot.querySelector(".information-container");

        gsap.fromTo(
            mainContainer,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
            }
        );
    }
    /* ----END ANIMATION FUNCTIONS ---- */
}
customElements.define('information-view', InformationView);