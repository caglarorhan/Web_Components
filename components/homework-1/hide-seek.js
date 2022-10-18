class HideSeek extends HTMLElement {
    constructor(){
        super();
        this._isVisible = false;
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
        <style>
            #info-box{display:none}
            #info-button{width:100px; text-align:center}
        </style>
        <button type="button" id="info-button">Show</button>
        <p id="info-box">
            <slot></slot>
        </p>
        `;
        this._toogleButton = this.shadowRoot.querySelector('#info-button');
        this._infoBox = this.shadowRoot.querySelector('#info-box');
        this._toogleButton.addEventListener('click', this._toggleInfoBox.bind(this))
    }
    _toggleInfoBox(){
        this._isVisible = !this._isVisible;
        this._infoBox.style.display = this._isVisible? 'block' : 'none';
        this._toogleButton.textContent = this._isVisible? 'Hide' : 'Show';

    }

}

customElements.define('hide-seek', HideSeek);
