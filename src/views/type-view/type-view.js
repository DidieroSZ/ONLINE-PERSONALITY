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

export class TypeView extends LitElement {
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
            <section class="general-section type-container container-styled d-flexx d-col">
                <div class="header-type-container d-flexx d-row">
                    <p>Choose your vibe</p>
                    <button class="btn-gen btn-lowKey">Surprise me</button>
                </div>
                <div class="footer-type-container d-flexx d-row">
                    ${this._renderOptions()}
                </div>
            </section>
        `;
    }

    _renderOptions(){
        const vibeTypes = [
            {
                id: 'gaming',
                name: 'Gaming',
                icon: 'gamepad'
            },
            {
                id: 'music',
                name: 'Music',
                icon: 'music-note'
            },
            {
                id: 'anime',
                name: 'Anime',
                icon: 'sparkles'
            },
            {
                id: 'tech',
                name: 'Tech',
                icon: 'cpu'
            },
            {
                id: 'dark',
                name: 'Dark',
                icon: 'moon-stars'
            },
            {
                id: 'cute',
                name: 'Cute',
                icon: 'heart'
            },
            {
                id: 'retro',
                name: 'Retro',
                icon: 'cassette'
            },
            {
                id: 'cyber',
                name: 'Cyber',
                icon: 'shield'
            },
            {
                id: 'minimal',
                name: 'Minimal',
                icon: 'circle'
            },
            {
                id: 'fantasy',
                name: 'Fantasy',
                icon: 'wand-stars'
            }
        ];

        return vibeTypes.map(type => html`
            <type-component
                .idType=${type.id}
                .iconType=${type.icon}
                .nameType=${type.name}
                .checkedType=${this.selectedType === type.id}
                @type-selected=${this._changeType}>
            </type-component>
        `); 
    }

    _changeType(e){
        this.selectedType = e.detail.type;
    }
}
customElements.define('type-view', TypeView);