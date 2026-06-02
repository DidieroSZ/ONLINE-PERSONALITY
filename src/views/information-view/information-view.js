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

/* --- UTILS --- */
import { fantasyRealms } from '../../utils/fantasy-realms.js'
/* --- UTILS --- */

export class InformationView extends LitElement {
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
    ]

    render() {
        return html`
            <section class="general-section information-container container-styled d-flexx d-col">
                ${this._renderInformation()}
            </section>
        `;
    }

    _renderInformation(){
        let filterred = fantasyRealms.filter( t => t.id === this.selectedType);
        
        return filterred.map(t => html`
            <div class="header-information d-flexx d-row">
                    <span class="btn-gen btn-primary" style="background-color: ${t.colors[2]}; color: ${t.colors[0]};">${unsafeHTML(icons[t.id])} ${t.name}</span>
                    <div class="labels d-flexx d-row">
                        <small class="label btn-gen"><p>POPUL:</p> ${ new Intl.NumberFormat().format(t.population) }</small>
                        <small class="label btn-gen"><p>KM<sup>2</sup>:</p> ${ new Intl.NumberFormat().format(t.territoryKm2) }</small>
                    </div>
                </div>
                <article class="main-information d-flexx d-col">
                    <h2 class="cursive-font">${t.capital}</h2>
                    <div class="info-places d-flexx d-row">
                        <small>LAT: ${t.latitude}</small>
                        <small>LONG: ${t.longitude}</small>
                    </div>
                    <p>${t.lore}</p>
                    <div class="colors d-flexx d-row">
                        <span class="item border" style="background-color: ${t.colors[0]};"></span>
                        <span class="item border" style="background-color: ${t.colors[1]};"></span>
                        <span class="item border" style="background-color: ${t.colors[2]};"></span>
                    </div>
                </article>
                <div class="footer-information border">
                    <p>SIGNATURE "${t.motto}"</p>
                </div>
        `); 
    }

}
customElements.define('information-view', InformationView);