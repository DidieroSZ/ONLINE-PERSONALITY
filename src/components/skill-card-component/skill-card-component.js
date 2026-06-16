import { LitElement, css, html } from "lit";
import { unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/* --- STYLES --- */
import generalStyles from '../../styles/general.css?inline';
import innerStyles from './skill-card-component.css?inline';
/* --- STYLES --- */

/* --- ICONS --- */
import { icons } from '../../utils/icons.js'
/* --- ICONS --- */

export class SkillCardComponent extends LitElement {
    static properties = {
        skillName: { type: String},
        skillDescription: { type: String},
    };

    constructor() {
        super();
        this.skillDescription = '';
        this.skillName = '';
    }

    static styles = [
        css`${unsafeCSS(generalStyles)}`,
        css`${unsafeCSS(innerStyles)}`,
    ];

    render() {
        return html`
            <div class="card border">
                <div class="header-card border format-text-sm">${this.skillName}</div>
                <div class="footer-card">${this.skillDescription}.</div>
            </div>
        `;
    }
}
customElements.define('skill-card-component', SkillCardComponent);