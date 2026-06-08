import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './customization-view.css?inline';
/* --- STYLES --- */

/* --- COMPONENTS --- */
import '../../components/skill-card-component/skill-card-component.js';
/* --- COMPONENTS --- */

import { chance } from 'chance';

import Chart from 'chart.js/auto';

/* --- ICONS --- */
import { icons } from '../../utils/icons.js'
/* --- ICONS --- */

/* --- UTILS --- */
import { fantasyRealms } from '../../utils/fantasy-realms.js'
/* --- UTILS --- */

export class CustomizationView extends LitElement {
    static properties = {
        selectedType : { type: String },
        generatedName : { type: String },
        character: { type: Object },
        parseado: { type: Boolean },

    };

    constructor() {
        super();
        this.selectedType ='aetherion';
        this.generatedName ='BABY HELLO';
        this.character = {};

        this.parseado = false;
        this.statsChart = null;
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    firstUpdated(){
        /* this._generateName(); */
    }

    updated(changedProperties){

        if(changedProperties.has('character') && this.parseado){
            this.updateComplete.then(() => {
                this._createChart();
            });
        }
    }

    render() {
        return html`
            <section class="general-section container-styled customization-container d-flexx d-col">
                ${this._renderCharacter()}
                <div class="btns-container d-flexx d-row">
                    <button @click=${this._generateName} class="btn-gen btn-primary d-flexx trans">${unsafeHTML(icons.repeat)} Regenerate</button>
                    <button class="btn-gen btn-secundary d-flexx trans">${unsafeHTML(icons.copy)} Copy</button>
                    <button class="btn-gen btn-secundary d-flexx trans">${unsafeHTML(icons.save)} Save</button>
                </div>
            </section>
        `;
    }

    async _generateName(){
        const chance = new Chance();
        let n = chance.word({ syllables: 3 });
        let a = chance.word({ syllables: 4 });
        this.generatedName = n + ' ' + a;

        const response = await fetch('https://set.world/api/roll/character');
        this.character = await response.json();
        this.parseado = true;
    }

    _renderCharacter(){
        if (!this.parseado) {

            return html`
                <article class="container-styled first-container d-flexx d-col">
                    <p>Waiting to generate information...</p>
                </article>
            `;
        }

        return html`
            <article class="container-styled display-container d-flexx d-row">
                <div class="item-display player-info d-flexx d-col">
                    
                    <h2 class="less-cursive-font">${this.generatedName}</h2>
                    <span class="banner-player d-flexx"></span>
                    <div class="basic-info d-flexx d-row">
                        <span class="label-general btn-gen btn-primary level">Level: ${this.character.stats.level}</span>
                        <span class="label-general btn-gen ">PWR: 1452/1808</span>
                        <span class="label-general btn-gen ">${this.character.class.name}</span>
                        <span class="label-general btn-gen label-stats">Max Health: ${unsafeHTML(icons.heart)}${this.character.attributes.maxHealth}</span>
                        <span class="label-general btn-gen label-stats">Stamina: ${unsafeHTML(icons.stamina)}${this.character.attributes.stamina} </span>
                        <span class="label-general btn-gen label-stats">Walk Speed: ${unsafeHTML(icons.walk)}${this.character.attributes.walkSpeed}</span>
                        <span class="label-general btn-gen label-stats">Attack Speed: ${unsafeHTML(icons.attack)}${this.character.attributes.attackSpeed}</span>
                    </div>
                    <p>${this.character.class.flavor}.</p>
                    <div class="attributes-char">
                    </div>
                    
                    <div class="cards-container d-flexx d-col">
                        ${this._renderSkillCards(this.character.traits.skills)}
                    </div>

                </div>
                <div class="item-display player-stats d-flexx d-col">
                    <canvas id="statsChar"></canvas>
                </div>
            </article>
        `;        
    }

    _renderSkillCards(skillsArray){
        return skillsArray.map(s => html`
            <skill-card-component
                .skillName=${s.name}
                .skillDescription=${s.flavor}>
            </skill-card-component>
        `); 
    }

    _createChart(){
        const canvas = this.renderRoot.getElementById('statsChar');
        if(!canvas) return;

        if(this.statsChart){
            this.statsChart.destroy();
        }

        const attributes = this.character.attributes;
        const stats = this.character.stats;

        this.statsChart = new Chart(canvas, {
            type: 'radar',
            data: {
                labels: ['Physical Damage', 'Magical Damage', 'Strength', 'Dexterity', 'Intelligence', 'Wisdom', 'Agility', 'Vitality', 'Luck'
                ],
                datasets: [{
                    label: 'Character Stats',
                    data: [
                        attributes.physicalDamage,
                        attributes.magicalDamage,
                        stats.strength,
                        stats.dexterity,
                        stats.intelligence,
                        stats.wisdom,
                        stats.agility,
                        stats.vitality,
                        stats.luck,
                    ],
                    borderColor: '#F6850C',
                    backgroundColor: 'rgba(246, 133, 12, 0.129)',
                    borderWidth: 2,
                    pointBackgroundColor: '#F6850C'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}
customElements.define('customization-view', CustomizationView);