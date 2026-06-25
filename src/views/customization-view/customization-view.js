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

/* --- GSAP --- */
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
/* --- GSAP --- */

export class CustomizationView extends LitElement {
    static properties = {
        selectedType : { type: String },
        generatedName : { type: String },
        character: { type: Object },
        parseado: { type: Boolean },
        currentRealm: { type: String },
        theme: { type: String }
    };

    constructor() {
        super();
        this.selectedType ='';
        this.generatedName ='BABY HELLO';
        this.character = {};
        this.theme = localStorage.getItem('theme') || 'dark';

        this.parseado = false;
        this.statsChart = null;
    };

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    async updated(changedProperties){
        if(changedProperties.has('character') && this.parseado){
            this.updateComplete.then(() => {
                this._createChart();
            });
        }
        if(changedProperties.has('theme') && this.parseado){
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
                    
                    <button class="btn-gen btn-secundary d-flexx trans">${unsafeHTML(icons.download)} Download</button>
                </div>
            </section>
        `;
    }

    async _generateName(){
        this.currentRealm = this.selectedType;

        const response = await fetch('https://set.world/api/roll/character');
        this.character = await response.json();
        this._animationHeight();
        this.parseado = true;

        const chance = new Chance();
        let n = chance.word({ syllables: 3 });
        let a = chance.word({ syllables: 4 });
        this.generatedName = n + ' ' + a;
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
                    <span class="banner-player banner-bg ${this.currentRealm} d-flexx">
                        <h2 class="less-cursive-font">${this.generatedName}</h2>
                    </span>
                    <div class="basic-info d-flexx d-row">
                        <span class="label-general btn-gen btn-primary level">Level: ${this.character.stats.level}</span>
                        <span class="label-general btn-gen ">Na: ${this.currentRealm}</span>
                        <span class="label-general btn-gen ">Class: ${this.character.class.name}</span>
                    </div>
        
                    <p>${this.character.class.flavor}.</p>

                    <div class="cards-container d-flexx d-col">
                        ${this._renderSkillCards(this.character.traits.skills)}
                    </div>

                </div>
                <div class="item-display player-stats d-flexx d-col">
                    
                    <canvas id="statsChar"></canvas>
                    <div class="other-stats-info d-flexx d-row">
                        <div class="stats d-flexx d-col border " title="Max Health"><span class="d-flexx health">${unsafeHTML(icons.heart)}</span><p>${this.character.attributes.maxHealth}</p></div>
                        <div class="stats d-flexx d-col border " title="Stamina"><span class="d-flexx stamina">${unsafeHTML(icons.stamina)}</span><p>${this.character.attributes.stamina}</p></div>
                        <div class="stats d-flexx d-col border " title="Walk Speed"><span class="d-flexx walk">${unsafeHTML(icons.walk)}</span><p>${this.character.attributes.walkSpeed}</p></div>
                        <div class="stats d-flexx d-col border " title="Attack Speed"><span class="d-flexx attack">${unsafeHTML(icons.attack)}</span><p>${this.character.attributes.attackSpeed}</p></div>
                    </div>
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
        const chartTextColor = this.theme === 'light' ? '#6b6b7b' : '#8c8c8c';

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
                    backgroundColor: 'rgba(246,133,12,0.15)',
                    borderWidth: 2,

                    pointBackgroundColor: '#F6850C',
                    pointBorderColor: '#F6850C',
                    pointBorderWidth: 1,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointStyle: 'rectRot'
                }]
            },
            options: {
                interaction: {
                    intersect: false,
                    axis: 'xy',
                    mode: 'nearest',
                },
                responsive: true,
                animation: {
                    duration: 1800,
                    easing: 'easeOutElastic'
                },
                scales: {
                    r: {
                        angleLines: {
                            color: chartTextColor
                        },
                        grid: {
                            color: chartTextColor
                        },
                        pointLabels: {
                            color: chartTextColor
                        },
                        ticks: {
                            color: chartTextColor,
                            backdropColor: 'transparent',
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                }
            }
        });
    }

    /* ---- ANIMATION FUNCTIONS ---- */
    _animationHeight(){
        const mainContainer = this.renderRoot.querySelector(".customization-container");

        gsap.fromTo(
            mainContainer,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 2.2,
                ease: "power4.out",
            }
        );
    }
    /* ---- END ANIMATION FUNCTIONS ---- */
}
customElements.define('customization-view', CustomizationView);